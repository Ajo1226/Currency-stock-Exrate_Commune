import { Button, Flex } from "@mantine/core"
import Link from "next/link"
import Head from "next/head"

export default function Home() {
	return (
        <>
			<Head>
				<title>Commune - Stock&FX Mastery</title>
			</Head>
			<div style={{display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:"50px"}}>
				<img src="/logo.gif" style={{height:"400px", width:"400px", marginBottom:"30px"}}></img>
				<div style={{container:"revert",width:"60rem", textAlign:"center", marginBottom:"30px"}}>
					<h3>
						<span style={{fontSize:"30px"}}><strong>Commune-Stock&FM Mastery</strong></span><br /> As a ultimate destination for real-time stock prices, insightful market analysis, and up-to-the-minute forex rates,
						it is allowing you to effortlessly track your favorite stock companies and forex pairs. <br />
						With comprehensive news, it ensures you are always informed and empowered to make strategic decisions.
					</h3>
				</div>
				<Link href="/dashboard">
					<Button style={{fontSize:"20px", height:"40px"}}>Get Started</Button>
				</Link>
			</div>
        </>
    )
}


// export const getServerSideProps: GetServerSideProps = async () => {
// 	return {
// 		redirect: {
// 			destination: "/dashboard",
// 		},
// 		props: {},
// 	}
// }
