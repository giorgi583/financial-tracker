const {z} = require('zod');
const UserPrefference = require('../modules/userPrefferences-schema');

const userPrefferenceSchema = z.object({
    theme: z.enum(['light', 'dark']),
    currency: z.enum(['USD', 'EUR', 'GEL']),
    lang: z.enum(['en', 'ka']),
    color: z.enum(['blue', 'green', 'purple', 'red']),
    initialBalance: z.number(),
});

const getUserPrefferences = async (req: any, res: any) => {
    const userId = req.user.id;
    try {
        const prefferences = await UserPrefference.findOne({ where: { userId } });
        if (prefferences) {
            return res.status(200).json({ success: true, data: prefferences });
        } else {
            return res.status(404).json({ success: false, message: 'Prefferences not found' });
        }
    } catch (error) {
        console.error('Error fetching prefferences:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch prefferences' });
    }
};
console.log('hi')
const updateUserPrefferences = async (req: any, res: any) => {
    process.stdout.write('FUNCTION CALLED\n');
    console.log('function called');
    console.log('Update called, userId:', req.user?.id);
    console.log('Update body:', req.body);
    const userId = req.user.id;
    const updatedData = req.body;
    const validation = userPrefferenceSchema.partial().safeParse(updatedData);
    if (!validation.success) {
        console.log('Validation failed:', JSON.stringify(validation.error));
        return res.status(400).json({ success: false, message: validation.error.errors });
    }
    try {
        const [updated] = await UserPrefference.update(updatedData, { where: { userId } });
        if (updated) {
            const updatedPrefferences = await UserPrefference.findOne({ where: { userId }, raw: true });
            return res.status(200).json({ success: true, data: updatedPrefferences });
        } else {
            return res.status(404).json({ success: false, message: 'Prefferences not found' });
        }
    } catch (error) {
        console.error('Error updating prefferences:', error);
        return res.status(500).json({ success: false, message: 'Failed to update prefferences' });     
};
    }

module.exports = { getUserPrefferences, updateUserPrefferences };