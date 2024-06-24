import '../styles/mainmenu.css'

export default function MainMenu() {

  return(
    <header>
      <h1>A Pinch of 한미</h1>
      <nav>
        <ol>
          <li className="menu-item"><a href="#">Recipes</a></li>
          <li className="menu-item"><a href="#">Remixer</a></li>
          <li className="menu-item"><a href="#">About</a></li>
        </ol>
      </nav>
    </header>
  );
}
