function toRadians(angle) {
  return (angle * 2 * Math.PI) / 360;
}

function unitVectorAngle(u, v) {
  const sign = u.x * v.y - u.y * v.x < 0 ? -1 : 1;
  const dot = u.x * v.x + u.y * v.y;
  const dotClamped = Math.min(Math.max(dot, -1.0), 1.0);

  return sign * Math.acos(dotClamped);
}

function arcCenterParametrization(
  p1,
  p2,
  largeArc,
  sweep,
  radius,
  sinTheta,
  cosTheta
) {
  const x1p = (cosTheta * (p1.x - p2.x)) / 2 + (sinTheta * (p1.y - p2.y)) / 2;
  const y1p = (-sinTheta * (p1.x - p2.x)) / 2 + (cosTheta * (p1.y - p2.y)) / 2;

  const rxSq = radius.x * radius.x;
  const rySq = radius.y * radius.y;
  const x1pSq = x1p * x1p;
  const y1pSq = y1p * y1p;

  let radicant = Math.max(rxSq * rySq - rxSq * y1pSq - rySq * x1pSq, 0);
  radicant /= rxSq * y1pSq + rySq * x1pSq;
  radicant = Math.sqrt(radicant) * (largeArc === sweep ? -1 : 1);

  const cxp = ((radicant * radius.x) / radius.y) * y1p;
  const cyp = radicant * (-radius.y / radius.x) * x1p;

  const cx = cosTheta * cxp - sinTheta * cyp + (p1.x + p2.x) / 2;
  const cy = sinTheta * cxp + cosTheta * cyp + (p1.y + p2.y) / 2;

  const v1x = (x1p - cxp) / radius.x;
  const v1y = (y1p - cyp) / radius.y;
  const v2x = (-x1p - cxp) / radius.x;
  const v2y = (-y1p - cyp) / radius.y;

  const theta1 = unitVectorAngle({ x: 1, y: 0 }, { x: v1x, y: v1y });
  let deltaTheta = unitVectorAngle({ x: v1x, y: v1y }, { x: v2x, y: v2y });

  if (sweep === 0 && deltaTheta > 0) {
    deltaTheta -= 2 * Math.PI;
  }
  if (sweep === 1 && deltaTheta < 0) {
    deltaTheta += 2 * Math.PI;
  }

  return {
    center: { x: cx, y: cy },
    theta: theta1,
    deltaTheta: deltaTheta,
  };
}

function approximateUnitArc(theta, deltaTheta) {
  const alpha = (4 / 3) * Math.tan(deltaTheta / 4);

  let x1 = Math.cos(theta);
  let y1 = Math.sin(theta);
  let x2 = Math.cos(theta + deltaTheta);
  let y2 = Math.sin(theta + deltaTheta);

  return [
    { x: x1, y: y1 },
    { x: x1 - y1 * alpha, y: y1 + x1 * alpha },
    { x: x2 + y2 * alpha, y: y2 - x2 * alpha },
    { x: x2, y: y2 },
  ];
}

function applyArcPointTransform(p, centerP, radius, sinTheta, cosTheta) {
  let x = p.x;
  let y = p.y;

  x *= radius.x;
  y *= radius.y;

  const xp = cosTheta * x - sinTheta * y;
  const yp = sinTheta * x + cosTheta * y;

  return { x: xp + centerP.center.x, y: yp + centerP.center.y };
}

function arcToCubicBez(p1, p2, largeArc, sweep, radius, theta) {
  const sinTheta = Math.sin(toRadians(theta));
  const cosTheta = Math.cos(toRadians(theta));

  const x1p = (cosTheta * (p1.x - p2.x)) / 2 + (sinTheta * (p1.y - p2.y)) / 2;
  const y1p = (-sinTheta * (p1.x - p2.x)) / 2 + (cosTheta * (p1.y - p2.y)) / 2;

  if (x1p === 0 && y1p === 0) {
    return [];
  }
  if (radius.x === 0 || radius.y === 0) {
    return [];
  }

  let rx = Math.abs(radius.x);
  let ry = Math.abs(radius.y);

  const lambda = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);

  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  }

  const centerP = arcCenterParametrization(
    p1,
    p2,
    largeArc,
    sweep,
    { x: rx, y: ry },
    sinTheta,
    cosTheta
  );

  let result = [];
  theta = centerP.theta;
  let deltaTheta = centerP.deltaTheta;

  const numSegments = Math.max(
    Math.ceil(Math.abs(deltaTheta) / (Math.PI / 2)),
    1
  );
  deltaTheta /= numSegments;

  for (let i = 0; i < numSegments; ++i) {
    const curve = approximateUnitArc(theta, deltaTheta);

    result.push([
      applyArcPointTransform(
        curve[0],
        centerP,
        { x: rx, y: ry },
        sinTheta,
        cosTheta
      ),
      applyArcPointTransform(
        curve[1],
        centerP,
        { x: rx, y: ry },
        sinTheta,
        cosTheta
      ),
      applyArcPointTransform(
        curve[2],
        centerP,
        { x: rx, y: ry },
        sinTheta,
        cosTheta
      ),
      applyArcPointTransform(
        curve[3],
        centerP,
        { x: rx, y: ry },
        sinTheta,
        cosTheta
      ),
    ]);

    theta += deltaTheta;
  }

  return result;
}

export { arcToCubicBez };
