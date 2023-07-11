import React, { useEffect, useState } from "react";
import { fetchSitemap } from "../fetchSitemap";

const SitemapPage = () => {
	const [sitemap, setSitemap] = useState("");

	useEffect(() => {
		fetchSitemap().then((data) => setSitemap(data));
	}, []);

	return (
		<div>
			<h1>Sitemap</h1>
			<pre>{sitemap}</pre>
		</div>
	);
};

export default SitemapPage;
