const depMapCNVQuery = geneId => ({
	from: 'Gene',
	select: [
		'Gene.depMapCopyNumber.cellLine.DepMapID',
		'Gene.depMapCopyNumber.cellLine.Lineage',
		'Gene.depMapCopyNumber.cellLine.Disease',
		'Gene.depMapCopyNumber.DepmapCnvValue'
	],
	orderBy: [
		{
			path: 'Gene.depMapCopyNumber.cellLine.Disease',
			direction: 'ASC'
		}
	],
	where: [
		{
			path: 'Gene.id',
			op: '=',
			value: geneId
		}
	]
});

import imjs from 'imjs';

function queryData(geneId, serviceUrl, imjsClient = imjs) {
	return new Promise((resolve, reject) => {
		const service = new imjsClient.Service({ root: serviceUrl });
		service
			.records(depMapCNVQuery(geneId))
			.then(data => {
				if (data.length) resolve(data[0]);
				else reject('No data found!');
			})
			.catch(() => reject('No data found!'));
	});
}

export default queryData;