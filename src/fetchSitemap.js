export async function fetchSitemap() {
	const response = await fetch("https://xlookpro.com/api/sitemap.xml");
	const data = await response.text();
	return data;
}
