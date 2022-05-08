const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

//* Require para usar Prisma
const { PrismaClient } = require('@prisma/client');
const { application } = require('express');
const prisma = new PrismaClient();

app.get('/', (req, res) => {
    res.json({message: 'alive'});
});

//* Explorer Table
//* ================================================================================
app.get('/explorers', async (req, res) => {
    const allExplorers =  await prisma.explorer.findMany({});
    res.json(allExplorers);
});

app.get('/explorers/:id', async (req, res) => {
    const id = req.params.id;
    const explorer = await prisma.explorer.findUnique({where: {id: parseInt(id)}});
    res.json(explorer);
});

app.post('/explorers', async (req, res) => {
    const explorer = {
        name: req.body.name,
        username: req.body.username,
        mission: req.body.mission
    };
    const message = 'Explorer creado.';
    await prisma.explorer.create({data: explorer});
    return res.json({message});
});

app.put('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	await prisma.explorer.update({
		where: {
			id: id
		},
		data: {
			mission: req.body.mission
		}
	})

	return res.json({message: "Actualizado correctamente"});
});

app.delete('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.explorer.delete({where: {id: id}});
	return res.json({message: "Eliminado correctamente"});
});

//* Partner Table
//* ================================================================================
app.get('/partners', async (req, res) => {
    const allPartners =  await prisma.partner.findMany({});
    res.json(allPartners);
});

app.get('/partners/:id', async (req, res) => {
    const id = req.params.id;
    const partner = await prisma.partner.findUnique({where: {id: parseInt(id)}});
    res.json(partner);
});

app.post('/partners', async (req, res) => {
    const partner = {
        name: req.body.name,
        lang: req.body.lang,
        missionComander: req.body.missionComander,
        enrollments: req.body.enrollments,
        hasCertification: req.body.hasCertification
    };
    const message = 'Partner creado.';
    await prisma.partner.create({data: partner});
    return res.json({message});
});

app.put('/partners/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	await prisma.partner.update({
		where: {
			id: id
		},
		data: {
			enrollments: req.body.enrollments
		}
	})

	return res.json({message: "Actualizado correctamente"});
});

app.delete('/partners/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.partner.delete({where: {id: id}});
	return res.json({message: "Eliminado correctamente"});
});


app.listen(port, () => {
    console.log(`Listening to requests on port ${port}`);
});