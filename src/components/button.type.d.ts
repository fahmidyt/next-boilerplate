/** @format */

export interface BaseButtonProps extends React.PropsWithChildren {
	icon?: React.ReactNode
	size?: "small" | "middle" | "large"
	disabled?: boolean
	loading?: boolean | { delay?: number }
	className?: string
	block?: boolean
	[key: `data-${string}`]: string
}

export type AnchorButtonProps = {
	href: string
	target?: string
	onClick?: React.MouseEventHandler<HTMLAnchorElement>
} & BaseButtonProps &
	Omit<React.AnchorHTMLAttributes<HTMLAnchorElement | HTMLButtonElement>, "type" | "onClick">

export type NativeButtonProps = {
	htmlType?: ButtonHTMLType
	onClick?: React.MouseEventHandler<HTMLButtonElement>
} & BaseButtonProps &
	Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick">

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>

type CompoundedComponent = React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>> & {
	Group: typeof Group
	/** @internal */
	__ANT_BUTTON: boolean
}

type Loading = number | boolean

type LoadingConfigType = {
	loading: boolean
	delay: number
}
