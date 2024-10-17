namespace $ {

	export function $hyoo_bunker_log_node_hidden (
		event : $mol_log3_event<{}> ,
	) {

		const place_name = (event.place as any)?.toString()
		if( place_name?.startsWith( '$' + 'hyoo_crus_app' ) ) return true
		if( place_name?.startsWith( '$' + 'hyoo_crus_mine' ) ) return true
		if( place_name?.startsWith( '$' + 'hyoo_crus_glob' ) ) return true
		if( place_name?.startsWith( '$' + 'hyoo_crus_land' ) ) return true
		if( place_name?.startsWith( '$' + 'mol_wire_task' ) ) return true

		return false

	}

	export function $hyoo_bunker_log_node_make(
		level : keyof Console ,
		output : 'stdout' | 'stderr',
		type : string ,
		color: ( str: string )=> string ,
	) {

		return function $hyoo_bunker_logger(
			this : $ ,
			event : $mol_log3_event<{}> ,
		) {

			if( type != 'fail' && $hyoo_bunker_log_node_hidden( event ) ) return ()=> {}

			if( !event.time ) event = { time : new Date().toISOString() , ... event }

			let tree = this.$mol_tree2_from_json( event )
			tree = tree.struct( type, tree.kids )
			
			let str = color( tree.toString() )
			;( this.console[ level ] as any )( str )
	
			const self = this
			return ()=> self.console.groupEnd()

		}

	}
	
	$.$mol_log3_come = $hyoo_bunker_log_node_make( 'info' , 'stdout' , 'come' , $mol_term_color.blue )
	$.$mol_log3_done = $hyoo_bunker_log_node_make( 'info' , 'stdout' , 'done' , $mol_term_color.green )
	$.$mol_log3_fail = $hyoo_bunker_log_node_make( 'error' , 'stderr' , 'fail' , $mol_term_color.red )
	$.$mol_log3_warn = $hyoo_bunker_log_node_make( 'warn' , 'stderr' , 'warn' , $mol_term_color.yellow )
	$.$mol_log3_rise = $hyoo_bunker_log_node_make( 'log' , 'stdout' , 'rise' , $mol_term_color.magenta )
	$.$mol_log3_area = $hyoo_bunker_log_node_make( 'log' , 'stdout' , 'area' , $mol_term_color.cyan )

}
