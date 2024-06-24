import { parse } from "./svg-path-grammar.js"; // you can also find it here: https://github.com/AlexandruIca/svg-path-parser
import { arcToCubicBez } from "./svg-arc-to-cubics.js"; // also explained here: https://minus-ze.ro/posts/flattening-bezier-curves-and-arcs/

function parsePath(path) {
  try {
    return parse(path);
  } catch (error) {
    console.error(error);
    return null;
  }
}

function floatEQ(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}

function areEqual(a, b) {
  return floatEQ(a.x, b.x) && floatEQ(a.y, b.y);
}

function toAbsolute(current, next) {
  return { x: current.x + next.x, y: current.y + next.y };
}

function pointDist(p1, p2) {
    let dist = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
    console.assert(!isNaN(dist), p1, p2);
    return dist;
}

function lineAt(p0, p1, t) {
  return {
    x: p0.x + t * (p1.x - p0.x),
    y: p0.y + t * (p1.y - p0.y),
  };
}

function mirror(p0, p1) {
  return lineAt(p0, p1, 2);
}

function cubicFromLine(p0, p1) {
  return {
    cmd: "C",
    data: [
      { x: p0.x, y: p0.y },
      lineAt(p0, p1, 1 / 3),
      lineAt(p0, p1, 2 / 3),
      { x: p1.x, y: p1.y },
    ],
  };
}

function cubicFromArc(newPath, from, radius, angle, largeArc, sweepFlag, to) {
  let result = [];
  for (let curve of arcToCubicBez(
    from,
    to,
    largeArc * 1,
    sweepFlag * 1,
    radius,
    angle
  )) {
    result.push({ cmd: "C", data: curve, beginning: newPath });
    newPath = false;
  }
  return result;
}

function cubicFromQuadratic(p0, p1, p2) {
  const c1 = { x: (1 / 3) * (p0.x + 2 * p1.x), y: (1 / 3) * (p0.y + 2 * p1.y) };
  const c2 = { x: (1 / 3) * (2 * p1.x + p2.x), y: (1 / 3) * (2 * p1.y + p2.y) };

  return {
    cmd: "C",
    data: [{ ...p0 }, c1, c2, { ...p2 }],
  };
}

function normalize(pathCommands) {
  let result = [];
  let startingPoint = { x: 0, y: 0 };
  let currentPoint = { x: 0, y: 0 };
  let prevQ = null;
  let prevC = null;
  let newPath = true;

  for (let op of pathCommands) {
    switch (op.cmd) {
      case "z":
      case "Z": {
        if (!areEqual(startingPoint, currentPoint)) {
          result.push(cubicFromLine(currentPoint, startingPoint));
        }
        currentPoint = { ...startingPoint };
        result[result.length - 1].ending = true;
        newPath = true;
        prevQ = null;
        prevC = null;
        break;
      }
      case "M": {
        newPath = true;
        startingPoint = op.data[0];
        currentPoint = {... startingPoint};
        for (let i = 1; i < op.data.length; ++i) {
          const starting = { ...currentPoint };
          currentPoint = op.data[i];
          result.push(cubicFromLine(starting, currentPoint));
          if (i === 1) {
            result[result.length - 1].beginning = true;
            newPath = false;
          }
        }
        prevQ = null;
        prevC = null;
        break;
      }
      case "m": {
        newPath = true;
        let ref = { ...currentPoint };
        startingPoint = toAbsolute(ref, op.data[0]);
        currentPoint = { ...startingPoint};
        for (let i = 1; i < op.data.length; ++i) {
          const starting = { ...currentPoint };
          ref = { ...currentPoint };
          currentPoint = toAbsolute(ref, op.data[i]);
          result.push(cubicFromLine(starting, currentPoint));
          if (i === 1) {
            result[result.length - 1].beginning = true;
            newPath = false;
          }
        }
        prevQ = null;
        prevC = null;
        break;
      }
      case "L": {
        for (let i = 0; i < op.data.length; ++i) {
          const starting = { ...currentPoint };
          currentPoint = op.data[i];
          result.push({
            ...cubicFromLine(starting, currentPoint),
            beginning: newPath,
          });
          newPath = false;
        }
        break;
      }
      case "l": {
        let ref = { ...currentPoint };
        for (let i = 0; i < op.data.length; ++i) {
          const starting = { ...currentPoint };
          ref = { ...currentPoint };
          currentPoint = toAbsolute(ref, op.data[i]);
          result.push({
            ...cubicFromLine(starting, currentPoint),
            beginning: newPath,
          });
          newPath = false;
        }
        break;
      }
      case "H": {
        const starting = { ...currentPoint };
        currentPoint.x = op.data[op.data.length - 1];
        result.push({
          ...cubicFromLine(starting, currentPoint),
          beginning: newPath,
        });
        newPath = false;
        break;
      }
      case "h": {
        const starting = { ...currentPoint };
        currentPoint.x = currentPoint.x + op.data[op.data.length - 1];
        result.push({
          ...cubicFromLine(starting, currentPoint),
          beginning: newPath,
        });
        newPath = false;
        break;
      }
      case "V": {
        const starting = { ...currentPoint };
        currentPoint.y = op.data[op.data.length - 1];
        result.push({
          ...cubicFromLine(starting, currentPoint),
          beginning: newPath,
        });
        newPath = false;
        break;
      }
      case "v": {
        const starting = { ...currentPoint };
        currentPoint.y = currentPoint.y + op.data[op.data.length - 1];
        result.push({
          ...cubicFromLine(starting, currentPoint),
          beginning: newPath,
        });
        newPath = false;
        break;
      }
      case "Q": {
        for (let i = 0; i < op.data.length; ++i) {
          const starting = { ...currentPoint };
          currentPoint = op.data[i].second;
          result.push({
            ...cubicFromQuadratic(
              starting,
              op.data[i].first,
              op.data[i].second
            ),
            beginning: newPath,
          });
          prevQ = [{ ...op.data[i].first }, { ...op.data[i].second }];
          newPath = false;
        }
        break;
      }
      case "q": {
        const ref = { ...currentPoint };
        for (let i = 0; i < op.data.length; ++i) {
          const starting = { ...currentPoint };
          currentPoint = toAbsolute(ref, op.data[i].second);
          result.push({
            ...cubicFromQuadratic(
              starting,
              toAbsolute(ref, op.data[i].first),
              toAbsolute(ref, op.data[i].second)
            ),
            beginning: newPath,
          });
          prevQ = [
            toAbsolute(ref, op.data[i].first),
            toAbsolute(ref, op.data[i].second),
          ];
          newPath = false;
        }
        break;
      }
      case "T": {
        for (let i = 0; i < op.data.length; ++i) {
          const starting = { ...currentPoint };
          if (!prevQ) {
            prevQ = [starting, starting];
          }
          const ctrl = mirror(prevQ[0], prevQ[1]);
          currentPoint = op.data[i];
          result.push({
            ...cubicFromQuadratic(starting, ctrl, currentPoint),
            beginning: newPath,
          });
          prevQ = [ctrl, { ...currentPoint }];
          newPath = false;
        }
        break;
      }
      case "t": {
        let ref = { ...currentPoint };
        for (let i = 0; i < op.data.length; ++i) {
          const starting = { ...currentPoint };
          ref = { ...currentPoint };
          if (!prevQ) {
            prevQ = [starting, starting];
          }
          const ctrl = mirror(prevQ[0], prevQ[1]);
          currentPoint = toAbsolute(ref, op.data[i]);
          result.push({
            ...cubicFromQuadratic(starting, ctrl, currentPoint),
            beginning: newPath,
          });
          prevQ = [ctrl, { ...currentPoint }];
          newPath = false;
        }
        break;
      }
      case "C": {
        for (let i = 0; i < op.data.length; ++i) {
          const starting = { ...currentPoint };
          currentPoint = op.data[i].third;
          result.push({
            cmd: "C",
            data: [
              starting,
              { ...op.data[i].first },
              { ...op.data[i].second },
              { ...op.data[i].third },
            ],
            beginning: newPath,
          });
          prevC = [{ ...op.data[i].second }, { ...op.data[i].third }];
          newPath = false;
        }
        break;
      }
      case "c": {
        let ref = { ...currentPoint };
        for (let i = 0; i < op.data.length; ++i) {
          const starting = { ...currentPoint };
          ref = { ...currentPoint };
          currentPoint = toAbsolute(ref, op.data[i].third);
          result.push({
            cmd: "C",
            data: [
              starting,
              toAbsolute(ref, op.data[i].first),
              toAbsolute(ref, op.data[i].second),
              toAbsolute(ref, op.data[i].third),
            ],
            beginning: newPath,
          });
          prevC = [
            toAbsolute(ref, op.data[i].second),
            toAbsolute(ref, op.data[i].third),
          ];
          newPath = false;
        }
        break;
      }
      case "S": {
        for (let i = 0; i < op.data.length; ++i) {
          const starting = { ...currentPoint };
          if (!prevC) {
            prevC = [starting, starting];
          }
          const ctrl = mirror(prevC[0], prevC[1]);
          currentPoint = op.data[i].second;
          result.push({
            cmd: "C",
            data: [
              starting,
              ctrl,
              { ...op.data[i].first },
              { ...op.data[i].second },
            ],
            beginning: newPath,
          });
          prevC = [{ ...op.data[i].first }, { ...op.data[i].second }];
          newPath = false;
        }
        break;
      }
      case "s": {
        let ref = { ...currentPoint };
        for (let i = 0; i < op.data.length; ++i) {
          const starting = { ...currentPoint };
          ref = { ...currentPoint };
          if (!prevC) {
            prevC = [starting, starting];
          }
          const ctrl = mirror(prevC[0], prevC[1]);
          currentPoint = toAbsolute(ref, op.data[i].second);
          result.push({
            cmd: "C",
            data: [
              starting,
              ctrl,
              toAbsolute(ref, op.data[i].first),
              toAbsolute(ref, op.data[i].second),
            ],
            beginning: newPath,
          });
          prevC = [
            toAbsolute(ref, op.data[i].first),
            toAbsolute(ref, op.data[i].second),
          ];
          newPath = false;
        }
        break;
      }
      case "A": {
        for (let i = 0; i < op.data.length; ++i) {
          const starting = { ...currentPoint };
          currentPoint = op.data[i].to;
          result.push(
            ...cubicFromArc(
              newPath,
              starting,
              op.data[i].radius,
              op.data[i].rotation,
              op.data[i].largeArc,
              op.data[i].sweepFlag,
              currentPoint
            )
          );
          newPath = false;
        }
        break;
      }
      case "a": {
        let ref = { ...currentPoint };
        for (let i = 0; i < op.data.length; ++i) {
          const starting = { ...currentPoint };
          ref = { ...currentPoint };
          currentPoint = toAbsolute(ref, op.data[i].to);
          result.push(
            ...cubicFromArc(
              newPath,
              starting,
              op.data[i].radius,
              op.data[i].rotation,
              op.data[i].largeArc,
              op.data[i].sweepFlag,
              currentPoint
            )
          );
          newPath = false;
        }
        break;
      }
    }
  }

  return result;
}

function divmod(x, y) {
  return [Math.trunc(x / y), x % y];
}

function splitClosedPaths(path) {
  let result = [];

  for (let op of path) {
    if (op.beginning) {
      result.push([{ ...op }]);
    } else {
      result[result.length - 1].push({ ...op });
    }
  }

  return result;
}

// This will morph between two paths that have already been split. That is, none of the paths have any sub-paths.
// It will return the corresponding SVG path strings that you can use for your animations.
function matchPathLengths(from, to) {
  let first = from;
  let second = to;

  let swapped = false;
  if (first.length > second.length) {
    [first, second] = [second, first];
    swapped = true;
  }

  let resultFirst = [];
  let resultSecond = [];
  let stepFirst = 1;
  let [stepSecond, remainder] = divmod(second.length, first.length);

  let j = 0;
  for (let i = 0; i < first.length; i += stepFirst) {
    const until =
      i >= first.length - remainder ? j + stepSecond + 1: j + stepSecond;
    resultFirst.push(...convertToCubics(first[i], until - j));
    for (let k = j; k < until; ++k) {
      resultSecond.push(second[k]);
    }
    j = until;
  }

  if (j !== second.length) {
    console.error(
      `Dropped an op from second path: j=${j}, second.length=${second.length}, secondPath=${secondPath}`
    );
  }
  if (resultFirst.length !== resultSecond.length) {
    console.error(
      `Different lengths after conversion: first.length=${resultFirst.length}, second.length=${resultSecond.length}!`
    );
  }

  return swapped ? [resultSecond, resultFirst] : [resultFirst, resultSecond];
}

// This function will return all the SVG path strings that you need for animation.
// `from` and `to` are arbitrary SVG path strings.
// The result looks like:
//   [[a, b], [c, d], ...]
// Where each pair of strings are meant to be morphed.
function morph(from, to) {
  let firstPaths = splitClosedPaths(normalize(parsePath(from)));
  let secondPaths = splitClosedPaths(normalize(parsePath(to)));
  let swapped = false;

  if (firstPaths.length > secondPaths.length) {
    [firstPaths, secondPaths] = [secondPaths, firstPaths];
    swapped = true;
  }

  let result = [];
  let stepFirst = 1;
  let [stepSecond, remainder] = divmod(secondPaths.length, firstPaths.length);

  for (let i = 0, j = 0; i < firstPaths.length; i += stepFirst) {
    const until =
      i >= firstPaths.length - remainder ? j + stepSecond + 1 : j + stepSecond;
    for (let k = j; k < until; ++k) {
      result.push(
        swapped
          ? [secondPaths[k], firstPaths[i]]
          : [firstPaths[i], secondPaths[k]]
      );
    }
    j = until;
  }

  return result.map((path) => morphBetweenOptimized(path[0], path[1]));
}

function reversePath(path){
    let ending = path[path.length - 1].ending
    path = path.toReversed();
    for (let i = 0; i < path.length; i++) {
        console.assert(path[i].cmd == 'C');
        path[i] = {
            cmd: path[i]['cmd'],
            data: path[i].data.toReversed(),
            beginning: i===0,
            ending: (i === path.length - 1) && ending
        };
    }
    return path;
}


function bezierCost(op1, op2){
    let start_cost = pointDist(op1.data[0], op2.data[0]);
    let end_cost = pointDist(op1.data[3], op2.data[3]);
    let p1_cost = pointDist(op1.data[1], op2.data[1]);
    let p2_cost = pointDist(op1.data[2], op2.data[2]);

    let cost = start_cost + end_cost + 0.5 * (p1_cost + p2_cost);
    return cost;
}

function pathCost(from, to){
    let cost = 0;
    for (let i = 0; i < from.length; i++){
        cost += bezierCost(from[i], to[i]);
    }
    return cost;
}

function shiftPath(path, k){
    let sPath = []
    for (let i = 0; i < path.length; ++i){
        sPath.push({
            cmd: 'C',
            data: path[(i+k) % path.length].data,
            beginning: i === 0,
            ending: i === path.length - 1
        });
    }
    return sPath;
}

function morphBetweenOptimized(from, to){
    [from, to] = matchPathLengths(from, to);
    let reverseFrom = reversePath(from);

    let fromCandidates = [from, reverseFrom];

    if (from[from.length - 1].ending) {
        for (let i = 1; i < from.length; ++i){
            fromCandidates.push(shiftPath(from, i));
            fromCandidates.push(shiftPath(reverseFrom, i));
        }
    }

    let minCost = Number.MAX_VALUE;
    let bestFrom;
    for (let i = 0; i < fromCandidates.length; i++){
        let curFrom = fromCandidates[i];
        let curCost = pathCost(curFrom, to);
        if (curCost < minCost) {
            minCost = curCost;
            bestFrom = curFrom;
        }
    }


    // console.log(`cn=${naiveCost}, cr=${reverseCost}`);

    const firstPath = toSVGPathString(bestFrom);
    // const reversedPath = toSVGPathString(reverseFrom);
    //console.log(`f=${firstPath}, r=${reversedPath}`);
    const secondPath = toSVGPathString(to);
    return [firstPath, secondPath];
}

// This is a helper function that I've used to create the animations. It simply creates an SVG <g> element which animates the given paths indefinitely, using SMIL.
function createMorphGroup(morphedPaths, config) {
  const svgNS = "http://www.w3.org/2000/svg";
  let result = document.createElementNS(svgNS, "g");

  for (let [index, paths] of morphedPaths.entries()) {
    let path = document.createElementNS(svgNS, "path");
    let animation1 = document.createElementNS(svgNS, "animate");
    let animation2 = document.createElementNS(svgNS, "animate");

    path.setAttribute("id", `${config.id}${index}`);
    if (config.fill) {
      if (typeof config.fill === "string") {
        path.setAttribute("fill", `${config.fill}`);
      } else {
        let colorAnim1 = document.createElementNS(svgNS, "animate");
        colorAnim1.setAttribute("id", `${config.id}${index}color1`);
        colorAnim1.setAttribute("attributeName", "fill");
        colorAnim1.setAttribute("from", `${config.fill.from}`);
        colorAnim1.setAttribute("to", `${config.fill.to}`);
        colorAnim1.setAttribute("begin", `${config.id}${index}anim1.begin`);
        colorAnim1.setAttribute("dur", `${config.duration}`);
        colorAnim1.setAttribute("fill", "freeze");

        let colorAnim2 = document.createElementNS(svgNS, "animate");
        colorAnim2.setAttribute("id", `${config.id}${index}color2`);
        colorAnim2.setAttribute("attributeName", "fill");
        colorAnim2.setAttribute("from", `${config.fill.to}`);
        colorAnim2.setAttribute("to", `${config.fill.from}`);
        colorAnim2.setAttribute("begin", `${config.id}${index}anim2.begin`);
        colorAnim2.setAttribute("dur", `${config.duration}`);
        colorAnim2.setAttribute("fill", "freeze");

        path.appendChild(colorAnim1);
        path.appendChild(colorAnim2);
      }
    } else {
      path.setAttribute("fill", "transparent");
    }
    if (config.fillRule) {
      path.setAttribute("fill-rule", `${config.fillRule}`);
    }
    if (config.stroke) {
      if (typeof config.stroke === "string") {
        path.setAttribute("stroke", `${config.stroke}`);
      } else {
        let strokeAnim1 = document.createElementNS(svgNS, "animate");
        strokeAnim1.setAttribute("id", `${config.id}${index}stroke1`);
        strokeAnim1.setAttribute("attributeName", "stroke");
        strokeAnim1.setAttribute("from", `${config.stroke.from}`);
        strokeAnim1.setAttribute("to", `${config.stroke.to}`);
        strokeAnim1.setAttribute("begin", `${config.id}${index}anim1.begin`);
        strokeAnim1.setAttribute("dur", `${config.duration}`);
        strokeAnim1.setAttribute("fill", "freeze");

        let strokeAnim2 = document.createElementNS(svgNS, "animate");
        strokeAnim2.setAttribute("id", `${config.id}${index}stroke2`);
        strokeAnim2.setAttribute("attributeName", "stroke");
        strokeAnim2.setAttribute("from", `${config.stroke.to}`);
        strokeAnim2.setAttribute("to", `${config.stroke.from}`);
        strokeAnim2.setAttribute("begin", `${config.id}${index}anim2.begin`);
        strokeAnim2.setAttribute("dur", `${config.duration}`);
        strokeAnim2.setAttribute("fill", "freeze");

        path.appendChild(strokeAnim1);
        path.appendChild(strokeAnim2);
      }
    }
    if (config.strokeWidth) {
      path.setAttribute("stroke-width", `${config.strokeWidth}`);
    }
    if (config.strokeLineJoin) {
      path.setAttribute("stroke-linejoin", `${config.strokeLineJoin}`);
    }
    if (config.strokeLineCap) {
      path.setAttribute("stroke-linecap", `${config.strokeLineCap}`);
    }
    path.setAttribute("d", paths[0]);

    animation1.setAttribute("id", `${config.id}${index}anim1`);
    animation1.setAttribute("attributeName", "d");
    animation1.setAttribute("from", paths[0]);
    animation1.setAttribute("to", paths[1]);
    animation1.setAttribute(
      "begin",
      `0ms; ${config.id}${index}anim2.end + ${config.pause}`
    );
    animation1.setAttribute("dur", `${config.duration}`);
    animation1.setAttribute("fill", "freeze");

    animation2.setAttribute("id", `${config.id}${index}anim2`);
    animation2.setAttribute("attributeName", "d");
    animation2.setAttribute("from", paths[1]);
    animation2.setAttribute("to", paths[0]);
    animation2.setAttribute(
      "begin",
      `${config.id}${index}anim1.end + ${config.pause}`
    );
    animation2.setAttribute("dur", `${config.duration}`);
    animation2.setAttribute("fill", "freeze");

    path.appendChild(animation1);
    path.appendChild(animation2);
    result.appendChild(path);
  }

  return result;
}

function convertToCubics(op, count) {
let p0 = op.data[0];
let p1 = op.data[1];
let p2 = op.data[2];
let p3 = op.data[3];

let t = 1 / count;
let result = [];
for (let i = 1; i < count; ++i) {
  let { first, second } = splitCubic(p0, p1, p2, p3, t);
  result.push({ cmd: 'C', data: [...first] });
  p0 = second[0];
  p1 = second[1];
  p2 = second[2];
  p3 = second[3];
  t = 1 / (count - i);
}

function splitCubic(p0, p1, p2, p3, t) {
    const m0 = lineAt(p0, p1, t);
    const m1 = lineAt(p1, p2, t);
    const m2 = lineAt(p2, p3, t);
    const c1 = lineAt(m0, m1, t);
    const c2 = lineAt(m1, m2, t);
    const p = lineAt(c1, c2, t);

    return {
      first: [p0, m0, c1, p],
      second: [p, c2, m2, p3],
    };
  }
result.push({ cmd: 'C', data: [p0, p1, p2, p3] });

if (op.beginning) {
  result[0].beginning = true;
}
if (op.ending) {
  result[result.length - 1].ending = true;
}
return result;
}


function toSVGPathString(cubics) {
  let result = "";

  for (let op of cubics) {
    if (op.beginning) {
      result += `M${op.data[0].x} ${op.data[0].y}C${op.data[1].x} ${op.data[1].y},${op.data[2].x} ${op.data[2].y},${op.data[3].x} ${op.data[3].y}`;
    } else {
      result += `C${op.data[1].x} ${op.data[1].y},${op.data[2].x} ${op.data[2].y},${op.data[3].x} ${op.data[3].y}`;
    }
    if (op.ending) {
      //result += "Z";
    }
  }

  return result;
}

function test(path) {
  console.log(toSVGPathString(splitClosedPaths(normalize(parsePath(path)))[0]));
}

export {createMorphGroup, morph, test};
