"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';

import './styles/home.css'

import RecipeCard from './components/RecipeCard';
import ImagePlusText from './components/elements/ImagePlusText';
import { getLatestRecipes } from './components/component-server-functions';
import Breeze from './components/decorations/Breeze';

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
          </div>
        </section>
      <section className="banner-img">
      </section>
    </div>
  );
}
