namespace $ {

	export function $hyoo_bunker_ranks_from_land( land: $hyoo_crus_land ) {
		const ranks: $hyoo_crus_rank_preset = {}
		
		const passes = land.pass.values()
		for (const pass of passes) {
			const auth = pass.auth()
			const key = $hyoo_crus_auth.from( auth ).public().toString()

			const lord = pass.lord()
			const rank = land.lord_rank( lord )

			ranks[ key ] = rank
		}
		return ranks
	}

}
