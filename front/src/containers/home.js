import React from "react";
import beer from '../assets/logo/chope.jpg';

function Home(props) {
	// console.log(props);
	return (
		<main>
			<h1>Bienvenue sur la Chopine</h1>
			<p id="home-presentation">Imaginez-vous dans une taverne douillette accompagné(e) de vos meilleur(e)s ami(e)s, dorloté(e) par la chaleur d'un feu. A deguster des bières atypiques brassées à base d'algues, de miel ou de piments.Vous n'avez plus qu'à trouver la taverne, car ici vous pourrez choper les bières les plus extravaguantes jamais crées. </p>
			<img src={beer} id="homerHome" alt="chope de bière"/>
		</main>
	);
}

export default Home;