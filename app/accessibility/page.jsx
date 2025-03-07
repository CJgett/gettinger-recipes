import '../styles/accessibility.css';

export default function AccessibilityPage() {
 
  return (
    <section className="accessibility-content normal-lists">
      <div className="centered-heading">
        <h2>Accessibility Statement</h2>

        Last Updated: March 5, 2025
      </div>
      <ol className="li-gap">

        <li>
          <h3>Our Commitment</h3>
          We are dedicated to creating an inclusive digital experience for all users, ensuring everyone can access and enjoy our recipes regardless of ability.
        </li>

        <li>
          <h3>Current Capabilities</h3>
          I've done my best to ensure that this website is accessible to all users. Overall, I've striven to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
          Here are some of the features I've implemented:
          <ul> 
            <li>Support for keyboard navigation</li>
            <li>Descriptive alt text for all images</li>
            <li>Responsive design across devices</li>
          </ul>
        </li>

        <li>
          <h3>Accessibility Challenges</h3>
          We recognize potential limitations with screen reader compatibility and are committed to ongoing improvements. Our team is actively working to identify and address accessibility barriers.
        </li>
        
        <li>
          <h3>Ongoing Improvements</h3>
          <ul> 
            <li>Regular accessibility reviews via the <a href="https://wave.webaim.org/">WAVE tool</a></li>
            <li>Commitment to improvement upon user feedback</li>
            <li>Testing using NVDA screen reader</li>
          </ul>
        </li>

    </ol>

    If you experience any difficulties accessing the content on this website, please contact Carly at <a href='mailto:cjgettinger@gmail.com?subject=gettinger-recipes accessibility'>cjgettinger[at]gmail.com</a>. I'd love to work with you to find a solution :)

    </section>
  );
}
