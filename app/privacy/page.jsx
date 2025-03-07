import '../styles/privacy.css';

export default function PrivacyPage() {
 
  return (
    <section className="normal-lists privacy-policy">
      <div className="centered-heading">
        <h2>Privacy Policy</h2>

        Last Updated: March 5, 2025
      </div>

      <ol className="li-gap">
        <li>
          <h3>Introduction</h3>
            This Privacy Policy describes how Gettinger Recipes ("we", "us", or "our") handles and protects user information. By using this website, you agree to the terms of this policy.
        </li>

        <li>
          <h3>Information We Collect</h3>
          We collect the following information:
            <ul>
              <li>Username and password for admin accounts</li>
              <li>Recipes and associated content uploaded by users</li>
            </ul>
        </li>

        <li>
          <h3>Cookies and Tracking</h3>
          This cookie is used solely to maintain your logged-in status and ensure the security of the admin area.
          The cookie is temporary and expires when you log out or close your browser.

          We do not use cookies for tracking, analytics, or marketing purposes.
        </li>

        <li>
          <h3>Purpose of Data Collection</h3>
          The primary purpose of collecting user data is to allow registered users to upload and manage their recipes on our platform.
        </li>

        <li>
          <h3>Age Restrictions</h3>
          Gettinger Recipes is intended for users who are 13 years of age or older. Users under 13 are not permitted to create accounts or use our services. If we discover that a user under 13 has provided personal information, we will promptly delete that information.
        </li>

        <li>
          <h3>Data Retention</h3>
            Users can request account deletion by sending an email to <a href='mailto:cjgettinger@gmail.com'>cjgettinger(at)gmail.com</a>.
        </li>

        <li>
          <h3>Data Security</h3>
            We implement the following security measures:
            <ul>
              <li>Password encryption</li>
              <li>Secure hosting infrastructure</li>
              <li>Protection against unauthorized access</li>
            </ul>
        </li>

        <li>
          <h3>Third-Party Services</h3>
            Gettinger Recipes uses Vercel as our hosting provider. Vercel collects information about website traffic, including:
            <ul>
              <li>End User IP address</li>
              <li>Location information derived from IP address</li>
              <li>System configuration information</li>
            </ul>
            This data is collected to ensure the proper functioning, security, and performance of our website. 
            For more details about Vercel's data collection practices, please review their <a href='https://vercel.com/legal/privacy-policy#information-we-collect-from-customers' target='_blank'>Privacy Policy</a>.
</li>
      
        <li>
          <h3>User Rights</h3>
            Users have the right to:
            <ul>
              <li>Request deletion of their account</li>
              <li>Access their uploaded content</li>
              <li>Ensure the accuracy of their information</li>
            </ul>
        </li>

        <li>
          <h3>Geographic Considerations</h3>
            We comply with privacy regulations applicable in the United States and European Union, including GDPR and CCPA standards.
        </li>

        <li>
          <h3>Policy Updates</h3>
            We reserve the right to modify this privacy policy at any time. Changes will be effective immediately upon posting on Gettinger Recipes. We encourage users to review this policy periodically.
        </li>

        <li>
          <h3>Contact Information</h3>
          For any privacy-related questions or concerns, please contact us by emailing Carly at <a href='mailto:cjgettinger@gmail.com'>cjgettinger(at)gmail.com</a>.
        </li>
      </ol>
    </section>
  );
}
