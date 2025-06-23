import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to My Portfolio</h1>
      <h2>Felipe S. Campoverde</h2>

      <div className="animeted-text">
        {" "}
        I'm a&nbsp;
        <span
          className="txt-rotate"
          data-period="2000"
          data-rotate='[ "Software Engineer", "Web Developer", "Tech Enthusiast" ]'
        ></span>
      </div>

      <p>This is a brief introduction about myself and my work.</p>
      <p>Feel free to explore my projects and get in touch!</p>
    </div>
  );
};

export default Home;
