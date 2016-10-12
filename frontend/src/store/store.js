/*
* @Author: Marco Ferreira
* @Date:   2016-10-12 03:10:39
* @Last Modified by:   Marco Ferreira
* @Last Modified time: 2016-10-12 17:11:57
*/

'use strict';

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		slots: []
	},
	mutations: {
		'ADD_SLOT' (state, payload) {
			state.slots.push(payload.slotData)
		},
		'RESET_SLOTS' (state, payload) {
			state.slots = payload
		}
	},
	actions: {
		'ADD_SLOT' ({ commit, state }, payload) {
			commit('ADD_SLOT', payload)
		},
		'RESET_SLOTS' ({ commit, state }, payload) {
			commit('RESET_SLOTS', payload)
		},
		'GET_ALL_SLOTS' ({ commit, state }) {
	        Vue.http.get('http://localhost:3000/parkinglots').then((response) => {
	          // success callback
	          commit('RESET_SLOTS', response.body)
	        }, (response) => {
	          // error callback
	        });
		}
	}
})
