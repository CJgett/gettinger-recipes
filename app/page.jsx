"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

import './styles/home.css'

import RecipeCard from './components/RecipeCard';
import ImagePlusText from './components/elements/ImagePlusText';
import { getLatestRecipes } from './components/component-server-functions';
import Breeze from './components/decorations/Breeze';

//import Soup from '../assets/img/handrawn-cooking/85365-hot-soup-bowl-hand-drawn-food.svg'
/*import bread from '../assets/img/handrawn-cooking/100604-bread-baguette-outline.svg'
import iceCream from '../assets/img/handrawn-cooking/107043-melting-hand-drawn-ice-cream-cone.svg'
import hotPot from '../assets/img/handrawn-cooking/117464-soup-spoon-hand-drawn-tool-with-hot-food.svg'
import watermelon from '../assets/img/handrawn-cooking/66663-watermelon-slice.svg'
import banana from '../assets/img/handrawn-cooking/81261-banana-fruit.svg'
import lemon from '../assets/img/handrawn-cooking/77691-half-lemon.svg'
import Sandwich from '../assets/img/handrawn-cooking/26521-thick-sandwich.svg'
import pizza from '../assets/img/handrawn-cooking/2291-pizza-slice.svg'*/

export default function HomePage() {
  const [latestRecipes, setLatestRecipes] = useState([]);

  useEffect(() => {
    getLatestRecipes(3).then(recipes => {
      setLatestRecipes(recipes);
    });
  }, []);
 
  return (
    <div className="home-wrapper">
      <section className="home-content">
        <div className="narrow-section">
          <h2>Welcome to the Gang!</h2>
          <ImagePlusText
            title="a hand reaches down to pinch Carly's head"
            imageSrc='/home_pics/flowers.jpg' 
            imageLeft={false} 
            flexText={1} 
            flexImage={1} 
            imageWidth={600} 
            imageHeight={1000} 
            altText="a hand reaches down to pinch Carly's head"
            pText={`As every other person from the US, I like food, and I like lots of it... same as my entire family. I started making food with my mom as a kid, and we still cook together when I visit - our strategy for pies, where I make the crust and she makes the filling, has never once failed us :)

            If you're on this site and you're not part of the family, well, you are now! 

            (PS: pls don't tell Buna* that we put her recipes on the world wide web - if you do tell her, tell her it definitely wasn't Carly, thank you!)

            *(Romanian for "grandma")`} />
          </div> 
          <h2>Latest Recipes</h2>
          <div className="recipe-cards-wrapper">
            {latestRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <div className="view-all-recipes-button-wrapper">
            <Breeze />
            <Link href="/recipes">
              <button className="view-all-recipes-button">View All Recipes</button>
            </Link>
            <Breeze />
          </div>
        </section>
      <section className="banner-img">
      </section>
    </div>
  );
}
