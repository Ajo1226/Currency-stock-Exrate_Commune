import { Flex } from "@mantine/core"
import { GetServerSideProps } from "next"
import Link from "next/link"

export default function Home() {
	return (
        <>
			<div style={{display: "flex", justifyContent:"center",  alignItems:"center"}}>
				<Link href="/dashboard">
					<button style={{fontSize:"30px", margin:"30px", padding:"10px", borderRadius:"10px"}}>Get started</button>
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
