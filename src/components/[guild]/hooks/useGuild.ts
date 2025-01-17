import { useWeb3React } from "@web3-react/core"
import useIsV2 from "hooks/useIsV2"
import useKeyPair from "hooks/useKeyPair"
import useSWRWithOptionalAuth from "hooks/useSWRWithOptionalAuth"
import { useRouter } from "next/router"
import { Guild } from "types"

const useGuild = (guildId?: string | number) => {
  const router = useRouter()

  const id = guildId ?? router.query.guild

  const { keyPair } = useKeyPair()
  const { account } = useWeb3React()
  const isV2 = useIsV2()
  const endpoint = isV2 ? `/v2/guilds/guild-page/${id}` : `/guild/${id}`

  const { data, mutate, isLoading } = useSWRWithOptionalAuth<Guild>(
    id ? endpoint : null,
    undefined,
    undefined,
    false
  )

  return {
    ...data,
    isDetailed: !!keyPair && !!account && !!data,
    isLoading,
    mutateGuild: mutate,
  }
}

export default useGuild
