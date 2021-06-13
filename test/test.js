/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var array2iterator = require( '@stdlib/array-to-iterator' );
var iterLast = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof iterLast, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if not provided an iterator', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		false,
		null,
		void 0,
		{},
		[],
		function noop() {}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			iterLast( value );
		};
	}
});

tape( 'if provided an "empty" iterator, the function returns `undefined`', function test( t ) {
	var arr;
	var v;

	arr = array2iterator( [] );
	v = iterLast( arr );

	t.strictEqual( v, void 0, 'returns expected value' );
	t.end();
});

tape( 'the function returns the last iterated value', function test( t ) {
	var arr;
	var v;

	arr = array2iterator( [ 0, 0, 0, 0, 1 ] );
	v = iterLast( arr );

	t.strictEqual( v, 1, 'returns expected value' );
	t.end();
});

tape( 'the function returns the last iterated value (value+done)', function test( t ) {
	var arr;
	var v;

	arr = createIterator( [ 0, 0, 1 ] );
	v = iterLast( arr );

	t.strictEqual( v, 1, 'returns expected value' );
	t.end();

	function createIterator( arr ) {
		var len;
		var it;
		var i;

		len = arr.length;
		i = -1;

		it = {};
		it.next = next;

		return it;

		function next() {
			var out;
			i += 1;
			if ( i < len ) {
				out = {};
				out.value = arr[ i ];
				out.done = ( i === len-1 );
				return out;
			}
			return {
				'done': true
			};
		}
	}
});
