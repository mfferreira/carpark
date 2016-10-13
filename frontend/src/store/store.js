/*
* @Author: Marco Ferreira
* @Date:   2016-10-12 03:10:39
* @Last Modified by:   Marco Ferreira
* @Last Modified time: 2016-10-13 05:37:10
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
		'ADD_LOT' (state, payload) {
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
		'ADD_LOT' ({ commit, state }, payload) {
			let headers = {"Content-Type": "application/json"}
			Vue.http.post(`http://localhost:3000/parkinglots/${payload.lot}/cars`, _.omit(payload, ['lot']), {headers: headers}).then((response) => {
	          // success callback
	          commit('ADD_LOT', _.extend(_.omit(payload, ['lot']), {parkinglotid: payload.lot}))
	        }, (response) => {
	          // error callback
	        });
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
		}
	}
})
