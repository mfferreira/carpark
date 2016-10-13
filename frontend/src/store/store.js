/*
* @Author: Marco Ferreira
* @Date:   2016-10-12 03:10:39
* @Last Modified by:   Marco Ferreira
* @Last Modified time: 2016-10-12 23:30:31
*/

'use strict';

import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		slots: [],
		inventory: {}
	},
	mutations: {
		'ADD_SLOT' (state, payload) {
			state.slots.push(payload.slotData)
		},
		'RESET_SLOTS' (state, payload) {
			state.slots = payload
		},
		'RESET_INVENTORY' (state, payload) {
			state.inventory = payload
		}
	},
	actions: {
		'ADD_SLOT' ({ commit, state }, payload) {
			commit('ADD_SLOT', payload)
		},
		'RESET_SLOTS' ({ commit, state }, payload) {
			commit('RESET_SLOTS', payload)
		},
		'RESET_INVENTORY' ({ commit, state }, payload) {
			commit('RESET_INVENTORY', payload)
		},
		'GET_ALL_SLOTS' ({ commit, state }) {
			commit('RESET_SLOTS', [])
	        Vue.http.get('http://localhost:3000/parkinglots').then((response) => {
	          // success callback
	          commit('RESET_SLOTS', response.body)
	        }, (response) => {
	          // error callback
	        });
		},
		'GET_LOTS_HOURS' ({ commit, state }, payload) {
        	console.log("getting lot value:", payload);
			commit('RESET_SLOTS', [])
	        Vue.http.get(`http://localhost:3000/parkinglots/${payload.lot}/cars/${payload.hours}`).then((response) => {
	          // success callback
	          const lots = _.map(response.body, lot => _.extend(lot, {parkinglotid: payload.lot}))
	          commit('RESET_SLOTS', lots)
	        }, (response) => {
	          // error callback
	        });
		},
		'GET_INVENTORY' ({ commit, state }, payload) {
			commit('RESET_INVENTORY', {})
	        Vue.http.get(`http://localhost:3000/inventory/${payload.hours}`).then((response) => {
	          // success callback
	          commit('RESET_INVENTORY', response.body)
	        }, (response) => {
	          // error callback
	        });
		},
	}
})
