namespace $ {

	export function $hyoo_bunker_ranks_from_land( land: $hyoo_crus_land ) {
		const ranks: $hyoo_crus_rank_preset = {}
		
		for (const [lord, gift] of land.gift.entries()) {
			const auth = $hyoo_crus_glob.Node( $hyoo_crus_ref(lord), $hyoo_bunker_peer ).land().key()!
			const rank = gift.rank()
			const key = auth.toString()
			if( key == $hyoo_crus_auth.current().public().toString() ) continue
			
			ranks[ key ] = rank
		}

		return ranks
	}

}
