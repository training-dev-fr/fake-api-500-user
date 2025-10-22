let data = require('./../data/users.json');

exports.getList = (req, res, next) => {
    let result = [...data];
    if (req.body.terms) {
        for (let term of req.body.terms) {
            result = result.filter(user =>
                user.firstName.toLowerCase().includes(term.toLowerCase()) ||
                user.lastName.toLowerCase().includes(term.toLowerCase()) ||
                user.jobTitle.toLowerCase().includes(term.toLowerCase())
            )
        }
    }
    res.status(200).json({
        count: result.length,
        data: result.slice(20 * (req.params.page - 1), 20 * (req.params.page))
    });
}

exports.getById = (req, res, next) => {
    let user = data.find(user => user.id == req.params.id);
    res.status(200).json(user);
}

exports.delete = (req, res, next) => {
    data = data.filter(user => user.id !== req.params.id);
    res.status(200).json({ success: true });
}

exports.create = (req, res, next) => {
    const errors = [];
    let user = req.body;
    // Vérification de la présence des champs
    const requiredFields = [
        "id",
        "firstName",
        "lastName",
        "jobTitle",
        "email",
        "imageUrl",
    ];

    for (const field of requiredFields) {
        if (!user[field]) {
            errors.push(`Le champ "${field}" est obligatoire.`);
        }
    }

    // Vérification du type des champs (si présents)
    if (user.id && typeof user.id !== "number") {
        errors.push(`Le champ "id" doit être un nombre.`);
    }

    if (user.firstName && typeof user.firstName !== "string") {
        errors.push(`Le champ "firstName" doit être une chaîne.`);
    }

    if (user.lastName && typeof user.lastName !== "string") {
        errors.push(`Le champ "lastName" doit être une chaîne.`);
    }

    if (user.jobTitle && typeof user.jobTitle !== "string") {
        errors.push(`Le champ "jobTitle" doit être une chaîne.`);
    }

    if (user.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        errors.push(`Le champ "email" n'est pas valide.`);
    }

    if (
        user.imageUrl &&
        !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(user.imageUrl)
    ) {
        errors.push(`Le champ "imageUrl" doit être une URL valide.`);
    }
    if (errors.length > 0) {
        return {
            isValid: errors.length === 0,
            errors,
        };
    }
    data.push(user);
    res.status(200).json({ success: true });
}