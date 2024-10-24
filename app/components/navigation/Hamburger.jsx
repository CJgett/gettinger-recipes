export default function Hamburger() {

  function toggleMobileMenu(e) {
    const targetClasses = e.target.classList;
    console.log(e.target);
    if (targetClasses.contains("hide")) {
      targetClasses.remove("hide");
      e.target.parentElement.parentElement.nextElementSibling.classList.remove("hide");
    } else {
      targetClasses.add("hide");
      e.target.parentElement.parentElement.nextElementSibling.classList.add("hide");
    } 
  }
  return (
    <div className="hamburger hide" onClick={toggleMobileMenu}>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </div>
  );
}
