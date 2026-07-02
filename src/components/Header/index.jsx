import "./header.css";

export function Header() {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <svg
          className="app-header__blob app-header__blob--lavender"
          viewBox="0 0 200 200"
        >
          <path
            fill="var(--color-lavender)"
            opacity="0.5"
            d="M42,-54.7C53.9,-46.4,62.3,-32.9,66.4,-18C70.5,-3.1,70.3,13.2,63.7,26.8C57.1,40.4,44.1,51.3,29.6,58.2C15.1,65.1,-0.9,68,-16.8,65.2C-32.7,62.4,-48.5,53.9,-58.5,40.8C-68.5,27.7,-72.7,10,-70.6,-6.5C-68.5,-23,-60.1,-38.3,-47.6,-46.8C-35.1,-55.3,-17.6,-57,-1,-55.7C15.5,-54.4,31,-63,42,-54.7Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          className="app-header__blob app-header__blob--tangerine"
          viewBox="0 0 200 200"
        >
          <path
            fill="var(--color-tangerine)"
            opacity="0.18"
            d="M45,-58.5C58.4,-49.8,69.4,-35.6,73.6,-19.6C77.8,-3.6,75.2,14.2,66.8,28.6C58.4,43,44.2,54,28.4,60.8C12.6,67.6,-4.8,70.2,-21.4,66.4C-38,62.6,-53.8,52.4,-63.4,37.9C-73,23.4,-76.4,4.6,-72.6,-12.3C-68.8,-29.2,-57.8,-44.2,-43.7,-53C-29.6,-61.8,-14.8,-64.4,1.6,-66.6C18,-68.8,36,-70.6,45,-58.5Z"
            transform="translate(100 100)"
          />
        </svg>
        <h1 className="app-header__title">Rumo</h1>
      </div>
      <p className="app-header__subtitle">
        dê rumo ao que precisa ser feito, no seu tempo.
      </p>
    </header>
  );
}
