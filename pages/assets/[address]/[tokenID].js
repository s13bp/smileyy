/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAddress, useMarketplace } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import TopNavbarLayout from "../../../layouts/TopNavBarLayout";
import NFTImage from '../../../components/NFTDetails/NFTImage'


const style = {

}



const NFT = () => {
    const [listing, setListing] = useState()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { tokenID } = router.query


    const marketplace = useMarketplace('0xAf4291a5869661390924A5345e540A61581F8615')
    const address = useAddress()

    useEffect(() => {
        getListing()
    }, [])

    useEffect(()=> {
        if(!address) {
            router.replace('/')
        }
    },[address] )

    const getListing = async () => {
        try {
            setLoading(true)
            const listing = await marketplace.getListing(BigNumber.from(tokenID))
            setListing(listing)
            setLoading(false)
        }
        catch(error) {
            console.log(error)
        }
    }
    return (
        <TopNavbarLayout>
            <div  className={style.wrapper}  >
                {loading ? (
                    <div> Loading.. </div>
                ) : (
                    <div className={style.nftContainer} >
                        <div  className={style.leftContainer} >
                            <div  className={style.leftElement} >
                                 <NFTImage image = {listing?.asset?.image}/> 
                            </div>
                            <div  className={style.leftElement} >
                                 {/* <NFTDetails /> */}
                            </div>

                        </div>
                        <div  className={style.rightContainer} >
                                 {/* <NFTBasicInfo /> */}
                                 <div  className={style.leftElement} >
                                    {/* <NFTSalesInfo /> */}
                                 </div>

                        </div>
                         </div>
                ) }
            </div>
        </TopNavbarLayout>
    )
}

export default NFT