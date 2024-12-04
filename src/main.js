import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMember from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UserFooter from './components/users/UserFooter.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        //nested routea
        { 
            name: 'teams',
            path: '/teams', 
            components: {
                default: TeamsList,
                footer: TeamsFooter
            },
            children: [
            { name: 'team-members', path: ':teamId', component: TeamMember, props: true },
        ]}, //our-domain.com/teams

        { path: '/users', components: {default: UsersList, footer: UserFooter} },
        { path: '/', redirect: '/teams' },

        //if user input link that not list on routes
        { path: '/:notFound(.*)', component: NotFound}
       
    ],
    linkActiveClass: 'active',
    scrollBehavior(to, from, savePositon) {
        console.log(to, from, savePositon);
        if(savePositon) {
            return savePositon;
        }
        return {
            left: 0,
            top: 0
        }
    }
});

const app = createApp(App);

app.use(router);

app.mount('#app');
