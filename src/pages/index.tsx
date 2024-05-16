import { Button, Flex } from "@mantine/core"
import { GetServerSideProps } from "next"
import Link from "next/link"

export default function Home() {
	return (
        <>
			<div style={{display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:"50px"}}>
				<img src="/logo.gif" style={{height:"400px", width:"400px", marginBottom:"30px"}}></img>
				<div style={{container:"revert", textAlign:"center", marginBottom:"30px"}}>
					<h3>
						This is a new idea to get Stock prices, Stock insights, Forex prices, Forex insights, and News related to the markets.<br></br>
						Users also can bookmark their favorite Stock companies and Forex pairs to keep track of them.
					</h3>
				</div>
				<Link href="/dashboard">
					<Button style={{fontSize:"20px", height:"40px"}}>Let's Go</Button>
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
