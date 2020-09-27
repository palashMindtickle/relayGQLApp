const fetchCommon = async ({ method = "GET", url, body }) => {
	const call = fetch(url, {
		method,
		headers: {
			"Content-Type": "application/json"
		},
		credentials: "same-origin",
		...(body ? { body: JSON.stringify(body) } : {})
	}).then(async res => {
		let data;
		try {
			data = await res.json();
		} catch (ex) {
			data = res.text();
		}
		return data;
	});
	return call;
};

function readableTime(time) {
	var hours = Math.floor(time / 3600) < 10 ? ("00" + Math.floor(time / 3600)).slice(-2) : Math.floor(time / 3600);
	var minutes = ("00" + Math.floor((time % 3600) / 60)).slice(-2);
	var seconds = ("00" + ((time % 3600) % 60)).slice(-2);
	return minutes + " mins " + seconds + " secs";
}

export const getContentMeta = async contentId => {
	const data = await fetchCommon({
		url: `/presentation/content`,
		method: "POST",
		body: {
			contentId: contentId.join(",")
		}
	});
	return data;
};

export const getEngagementContent = async (top = true) => {
	const response = await fetchCommon({
		url: `/insights/topcontent/engagement`,
		method: "POST",
		body: {
			top
		}
	});

	const data = response.data;

	const contentIds = data.map(d => d.contentId);

	const contentIdMap = await getContentMeta(contentIds);

	const output = data.map(d => {
		const agg = d.aggregateData;
		return {
			avgProspectTalktime:
				agg.avgProspectTalktime > 0
					? Math.round((agg.avgProspectTalktime / (agg.avgProspectTalktime + agg.avgTeamTalktime)) * 100) + "%"
					: "0%",
			avgNumberOfProspectQuestions: agg.avgNumberOfProspectQuestions,
			interchanges: agg.interchanges,
			content: contentIdMap[d.contentId]
		};
	});

	// return [
	// 	{
	// 		avgProspectTalktime: "10%",
	// 		avgNumberOfProspectQuestions: 2,
	// 		interchanges: 3,
	// 		content: {
	// 			pdfUrl:
	// 				"https://cf-ap1-mtdocs-box-processed.mindtickle.com/1306584338885626627/doc.pdf?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vY2YtYXAxLW10ZG9jcy1ib3gtcHJvY2Vzc2VkLm1pbmR0aWNrbGUuY29tLzEzMDY1ODQzMzg4ODU2MjY2MjcvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYwMjk2NDM3N30sIklwQWRkcmVzcyI6eyJBV1M6U291cmNlSXAiOiIwLjAuMC4wLzAifSwiRGF0ZUdyZWF0ZXJUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0NDQ5NzcxMTZ9fX1dfQ__&Signature=IZA-Ig8Kz-wbJgMz2BIYuBdufzLm~5o6yfJ0SUFktSZwg1esle8mfOgQKNV9yJUiJjwOJfeW0gkdm4L8TGx-OFGkRF77~eJPFwNVxi1hEl5H~FAb1Jspi4ePJVGUt1sXq6PftfdEu7Y28-UzcbmOaFID1cCOaLEjqIKS5zAu0x0_&Key-Pair-Id=APKAJRHSQBGT5CW7P2CA",
	// 			title: "title"
	// 		}
	// 	},
	// 	{
	// 		avgProspectTalktime: "10%",
	// 		avgNumberOfProspectQuestions: 2,
	// 		interchanges: 3,
	// 		content: {
	// 			pdfUrl:
	// 				"https://cf-ap1-mtdocs-box-processed.mindtickle.com/1306584338885626627/doc.pdf?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vY2YtYXAxLW10ZG9jcy1ib3gtcHJvY2Vzc2VkLm1pbmR0aWNrbGUuY29tLzEzMDY1ODQzMzg4ODU2MjY2MjcvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYwMjk2NDM3N30sIklwQWRkcmVzcyI6eyJBV1M6U291cmNlSXAiOiIwLjAuMC4wLzAifSwiRGF0ZUdyZWF0ZXJUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0NDQ5NzcxMTZ9fX1dfQ__&Signature=IZA-Ig8Kz-wbJgMz2BIYuBdufzLm~5o6yfJ0SUFktSZwg1esle8mfOgQKNV9yJUiJjwOJfeW0gkdm4L8TGx-OFGkRF77~eJPFwNVxi1hEl5H~FAb1Jspi4ePJVGUt1sXq6PftfdEu7Y28-UzcbmOaFID1cCOaLEjqIKS5zAu0x0_&Key-Pair-Id=APKAJRHSQBGT5CW7P2CA",
	// 			title: "title"
	// 		}
	// 	}
	// ];
	return output;
};

export const getObjections = async () => {
	const response = await fetchCommon({
		url: `/insights/topcontent/objections`,
		method: "POST",
		body: {}
	});

	const data = response.data;

	const contentIds = data.map(d => d.contentId);

	const contentIdMap = await getContentMeta(contentIds);

	const output = data.map(d => {
		const agg = d.aggregateData;
		return {
			topCompetitorsMentioned: agg.topCompetitorsMentioned && agg.topCompetitorsMentioned.join(","),
			competitorThemeMentioned: agg.competitorThemeMentioned,
			content: contentIdMap[d.contentId]
		};
	});
	return output;

	// return [
	// 	{
	// 		competitorThemeMentioned: 10,
	// 		topCompetitorsMentioned: ["Afroz", "Alam"].join(","),
	// 		content: {
	// 			pdfUrl:
	// 				"https://cf-ap1-mtdocs-box-processed.mindtickle.com/1306584338885626627/doc.pdf?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vY2YtYXAxLW10ZG9jcy1ib3gtcHJvY2Vzc2VkLm1pbmR0aWNrbGUuY29tLzEzMDY1ODQzMzg4ODU2MjY2MjcvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYwMjk2NDM3N30sIklwQWRkcmVzcyI6eyJBV1M6U291cmNlSXAiOiIwLjAuMC4wLzAifSwiRGF0ZUdyZWF0ZXJUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0NDQ5NzcxMTZ9fX1dfQ__&Signature=IZA-Ig8Kz-wbJgMz2BIYuBdufzLm~5o6yfJ0SUFktSZwg1esle8mfOgQKNV9yJUiJjwOJfeW0gkdm4L8TGx-OFGkRF77~eJPFwNVxi1hEl5H~FAb1Jspi4ePJVGUt1sXq6PftfdEu7Y28-UzcbmOaFID1cCOaLEjqIKS5zAu0x0_&Key-Pair-Id=APKAJRHSQBGT5CW7P2CA",
	// 			title: "title"
	// 		}
	// 	},
	// 	{
	// 		competitorThemeMentioned: 10,
	// 		topCompetitorsMentioned: ["Afroz", "Alam"].join(","),
	// 		content: {
	// 			pdfUrl:
	// 				"https://cf-ap1-mtdocs-box-processed.mindtickle.com/1306584338885626627/doc.pdf?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vY2YtYXAxLW10ZG9jcy1ib3gtcHJvY2Vzc2VkLm1pbmR0aWNrbGUuY29tLzEzMDY1ODQzMzg4ODU2MjY2MjcvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYwMjk2NDM3N30sIklwQWRkcmVzcyI6eyJBV1M6U291cmNlSXAiOiIwLjAuMC4wLzAifSwiRGF0ZUdyZWF0ZXJUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0NDQ5NzcxMTZ9fX1dfQ__&Signature=IZA-Ig8Kz-wbJgMz2BIYuBdufzLm~5o6yfJ0SUFktSZwg1esle8mfOgQKNV9yJUiJjwOJfeW0gkdm4L8TGx-OFGkRF77~eJPFwNVxi1hEl5H~FAb1Jspi4ePJVGUt1sXq6PftfdEu7Y28-UzcbmOaFID1cCOaLEjqIKS5zAu0x0_&Key-Pair-Id=APKAJRHSQBGT5CW7P2CA",
	// 			title: "title"
	// 		}
	// 	}
	// ];
};

export const getAdherance = async (top = true) => {
	const response = await fetchCommon({
		url: `/insights/topcontent/adherance`,
		method: "POST",
		body: {
			top
		}
	});

	const data = response.data;

	const contentIds = data.map(d => d.contentId);

	const contentIdMap = await getContentMeta(contentIds);

	const output = data.map(d => {
		const agg = d.aggregateData;
		return {
			recommendedTalkTime: readableTime(agg.recommendedTalkTime),
			avgTeamTalktime: readableTime(agg.avgTeamTalktime),
			content: contentIdMap[d.contentId]
		};
	});
	return output;

	// return [
	// 	{
	// 		recommendedTalkTime: 23,
	// 		avgTeamTalktime: 7,
	// 		content: {
	// 			pdfUrl:
	// 				"https://cf-ap1-mtdocs-box-processed.mindtickle.com/1306584338885626627/doc.pdf?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vY2YtYXAxLW10ZG9jcy1ib3gtcHJvY2Vzc2VkLm1pbmR0aWNrbGUuY29tLzEzMDY1ODQzMzg4ODU2MjY2MjcvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYwMjk2NDM3N30sIklwQWRkcmVzcyI6eyJBV1M6U291cmNlSXAiOiIwLjAuMC4wLzAifSwiRGF0ZUdyZWF0ZXJUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0NDQ5NzcxMTZ9fX1dfQ__&Signature=IZA-Ig8Kz-wbJgMz2BIYuBdufzLm~5o6yfJ0SUFktSZwg1esle8mfOgQKNV9yJUiJjwOJfeW0gkdm4L8TGx-OFGkRF77~eJPFwNVxi1hEl5H~FAb1Jspi4ePJVGUt1sXq6PftfdEu7Y28-UzcbmOaFID1cCOaLEjqIKS5zAu0x0_&Key-Pair-Id=APKAJRHSQBGT5CW7P2CA",
	// 			title: "title"
	// 		}
	// 	},
	// 	{
	// 		recommendedTalkTime: 23,
	// 		avgTeamTalktime: 7,
	// 		content: {
	// 			pdfUrl:
	// 				"https://cf-ap1-mtdocs-box-processed.mindtickle.com/1306584338885626627/doc.pdf?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vY2YtYXAxLW10ZG9jcy1ib3gtcHJvY2Vzc2VkLm1pbmR0aWNrbGUuY29tLzEzMDY1ODQzMzg4ODU2MjY2MjcvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYwMjk2NDM3N30sIklwQWRkcmVzcyI6eyJBV1M6U291cmNlSXAiOiIwLjAuMC4wLzAifSwiRGF0ZUdyZWF0ZXJUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0NDQ5NzcxMTZ9fX1dfQ__&Signature=IZA-Ig8Kz-wbJgMz2BIYuBdufzLm~5o6yfJ0SUFktSZwg1esle8mfOgQKNV9yJUiJjwOJfeW0gkdm4L8TGx-OFGkRF77~eJPFwNVxi1hEl5H~FAb1Jspi4ePJVGUt1sXq6PftfdEu7Y28-UzcbmOaFID1cCOaLEjqIKS5zAu0x0_&Key-Pair-Id=APKAJRHSQBGT5CW7P2CA",
	// 			title: "title"
	// 		}
	// 	}
	// ];
};

export const getInsightAggregates = async () => {
	return fetchCommon({ url: `/insights/aggregates` });
	// return {
	// 	noOfPresentations: 3,
	// 	noOfCallsWithPresentation: 2,
	// 	totalContentUsed: 2,
	// 	avgTimeSpentPerSlide: 110,
	// 	avgTeamTalktimePerSlide: 2,
	// 	avgProspectTalktimePerSlide: 0,
	// 	teamTalktimePercentage: 74,
	// 	prospectTalktimePercentage: 25,
	// 	avgTimeSpentPerPresentation: 2727,
	// 	avgTeamTalktimePerPresentation: 72,
	// 	avgProspectTalktimePerPresentation: 24,
	// 	avgNumberOfSlidesPerCall: 37,
	// 	avgCompetitorThemeDiscussedPerPresentation: 0,
	// 	avgNumberOfQuestionAskedPerPresentation: 6
	// };
};

export const getTopContents = async () => {
	const _data = await fetchCommon({ url: `/insights/topcontent`, method: "POST", body: {} });
	const contentId = _data.contentIds;
	const data = await fetchCommon({
		url: `/presentation/content`,
		method: "POST",
		body: {
			contentId: contentId.join(",")
		}
	});

	const output = [];
	for (var d in data) {
		if (data[d].pdfUrl) {
			output.push(data[d]);
		}
	}

	return output;

	return [
		{
			pdfUrl:
				"https://cf-ap1-mtdocs-box-processed.mindtickle.com/1306584338885626627/doc.pdf?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vY2YtYXAxLW10ZG9jcy1ib3gtcHJvY2Vzc2VkLm1pbmR0aWNrbGUuY29tLzEzMDY1ODQzMzg4ODU2MjY2MjcvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYwMjk2NDM3N30sIklwQWRkcmVzcyI6eyJBV1M6U291cmNlSXAiOiIwLjAuMC4wLzAifSwiRGF0ZUdyZWF0ZXJUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0NDQ5NzcxMTZ9fX1dfQ__&Signature=IZA-Ig8Kz-wbJgMz2BIYuBdufzLm~5o6yfJ0SUFktSZwg1esle8mfOgQKNV9yJUiJjwOJfeW0gkdm4L8TGx-OFGkRF77~eJPFwNVxi1hEl5H~FAb1Jspi4ePJVGUt1sXq6PftfdEu7Y28-UzcbmOaFID1cCOaLEjqIKS5zAu0x0_&Key-Pair-Id=APKAJRHSQBGT5CW7P2CA",
			title: "title"
		},
		{
			pdfUrl:
				"https://cf-ap1-mtdocs-box-processed.mindtickle.com/1306584338885626627/doc.pdf?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vY2YtYXAxLW10ZG9jcy1ib3gtcHJvY2Vzc2VkLm1pbmR0aWNrbGUuY29tLzEzMDY1ODQzMzg4ODU2MjY2MjcvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYwMjk2NDM3N30sIklwQWRkcmVzcyI6eyJBV1M6U291cmNlSXAiOiIwLjAuMC4wLzAifSwiRGF0ZUdyZWF0ZXJUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE0NDQ5NzcxMTZ9fX1dfQ__&Signature=IZA-Ig8Kz-wbJgMz2BIYuBdufzLm~5o6yfJ0SUFktSZwg1esle8mfOgQKNV9yJUiJjwOJfeW0gkdm4L8TGx-OFGkRF77~eJPFwNVxi1hEl5H~FAb1Jspi4ePJVGUt1sXq6PftfdEu7Y28-UzcbmOaFID1cCOaLEjqIKS5zAu0x0_&Key-Pair-Id=APKAJRHSQBGT5CW7P2CA",
			title: "title"
		}
	];
};