import Link from 'next/link'

const MainLayout: FCC = (props) => {
	return (
		<>
			<header className="py-3 flex items-center px-5">
				<h1 className="text-4xl font-bold">
					<Link href="/">🎮</Link>
				</h1>
			</header>
			<main className="flex-grow flex w-full px-5">
				<div className="flex-grow flex flex-col w-full">
					{props.children}
				</div>
			</main>
		</>
	)
}

export default MainLayout
