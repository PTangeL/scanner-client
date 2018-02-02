export const rand = () => Math.random().toString(36).substr(2) // remove `0.`

const hash = () => rand() + rand()

export default hash
