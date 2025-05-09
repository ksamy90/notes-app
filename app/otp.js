import { generateTOTP } from '@epic-web/totp'

const otpUri = new URL(
	'otpauth://totp/localhost%3A3000:kody%40kcd.dev?secret=EYK32Z76PS4OERYX&issuer=localhost%3A3000&algorithm=SHA1&digits=6&period=30',
)
const { secret, algorithm, digits, period } = Object.fromEntries(
	otpUri.searchParams.entries(),
)

const { otp } = generateTOTP({
	secret,
	algorithm,
	digits,
	period,
})

console.log(otp)
