namespace $ {
	
	$mol_test({
		
		async 'Put and get'( $ ) {

			const cli = $hyoo_bunker_cli.make({ $ })

			const path ='my/secret1'
			const value = 'secret1-value'

			await $mol_wire_async(cli).put( path, value )
			$mol_assert_equal( await $mol_wire_async(cli).get( path ), value )
			
		},
		
		async 'Put and get 1-level deep value'( $ ) {

			const cli = $hyoo_bunker_cli.make({ $ })

			const path ='my/secret1/kid1'
			const value = 'kid1-value'

			await $mol_wire_async(cli).put( path, value )
			$mol_assert_equal( await $mol_wire_async(cli).get( path ), value )
			
			
		},
		
		async 'Put and get 3-level deep value'( $ ) {

			const cli = $hyoo_bunker_cli.make({ $ })

			const path ='my/secret1/kid1/kid2/kid3'
			const value = 'kid3-value'

			await $mol_wire_async(cli).put( path, value )
			$mol_assert_equal( await $mol_wire_async(cli).get( path ), value )
			
		},

	})

}
