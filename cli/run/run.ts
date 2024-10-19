	namespace $ {

		$hyoo_crus_yard.masters = $mol_state_arg.value( 'masters' )?.split( ',' ) ?? []
		
		$mol_wire_async( ()=> {
			$hyoo_crus_app_node.serve()
			const cli = new $hyoo_bunker_cli
			cli._start()
		} )()

	}
