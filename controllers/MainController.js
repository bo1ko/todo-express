export const index = (req, res) => {
    try {
        res.status(201).render('index', { title: "Home" });
    } catch (error) {
        res.status(500).render('error', { message: error.message });
    }
}