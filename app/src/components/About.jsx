import React from 'react';

export default class About extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

    render() {
         return (
         	<div>
	         	<h2>About</h2>
							<p>This site contains PDFs of Anaheim newspapers digitized from microfilm at the Anaheim Heritage Room. Due to the capture process and the quality of the microfilm images, they are not text searchable. In the future, we may introduce functionality to make it easy to transcribe, collect, and share information from the pages.</p>
							<p>To date, all 30,000+ pages have been digitized by one person (Jason Schultz) in search of information about his house (208 E. Broadway). The papers and years chosen reflect this research. If you are interested in helping this volunteer effort, please contact Jason (<a href="mailto:progressland@gmail.com">progressland@gmail.com</a>) so he can coordinate with you.</p>
							<p>These are the main runs of newspapers of interest held at the Anaheim Heritage Room:</p>
							<ul>
								<li>Anaheim Gazette Oct. 29, 1870-Nov. 25, 1964</li>
								<li>Anaheim Bulletin Aug. 15, 1923-March 1995</li>
								<li>Anaheim Daily Herald Dec. 1, 1913-Dec. 31, 1923</li>
								<li>Orange County Plain Dealer Jan. 6, 1919-May 8, 1925</li>
							</ul>
							<p>Original artwork was created by <a href="https://www.facebook.com/Chris-Maya-Art-Gallery-169971276422543/" target="_blank">Chris Maya</a>, and software development by <a href="http://jonmabe.com" target="_blank">Jon Mabe</a>.</p>
         	</div>
         )
    }
}
