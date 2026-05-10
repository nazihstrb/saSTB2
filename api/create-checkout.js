const stripe = require('stripe')('Sk_live_51HqLsxHklbZ020Fa35ioXQolvQDPX5Vt3zn4lfDWNw5jcecVLyietsaVDXTUVkWUnbym8PXtV0CxZHOPeFlw1Wdo001HgRyGw8');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { amount } = req.body;
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: 'eur',
                        product_data: { name: 'Payment to MAGHNI NAZIH' },
                        unit_amount: Math.round(amount * 100),
                    },
                    quantity: 1,
                }],
                mode: 'payment',
                success_url: `${req.headers.origin}/?status=success`,
                cancel_url: `${req.headers.origin}/?status=cancel`,
            });
            res.status(200).json({ id: session.id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}