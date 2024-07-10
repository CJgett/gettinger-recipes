import Remixer from '../components/Remixer.jsx'
import '../styles/remixer.css'

export default function RemixerPage() {
 
  return (
    <div className="remixer-page">
      <section>
        <h2>Recipe Remixer!</h2>
        <Remixer />
      </section>
    </div>
  );
}
