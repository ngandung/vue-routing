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

        { 
            path: '/users', 
            components: {default: UsersList, footer: UserFooter},
            //This is the same as beforeEach but used in router path
            beforeEnter(to, from, next) {
                console.log('users beforeEnter');
                console.log(to, from);
                next();
            }
        },
        { path: '/', redirect: '/teams' },

        //if user input link that not list on routes
        { path: '/:notFound(.*)', component: NotFound}
       
    ],
    linkActiveClass: 'active',
    scrollBehavior(_, _2, savePositon) {
        //console.log(to, from, savePositon);
        if(savePositon) {
            return savePositon;
        }
        return {
            left: 0,
            top: 0
        }
    }
});

//this function will called before move to othe page by vue Globally
router.beforeEach(function(to, from, next) {
    console.log('Global before each');
    console.log(to, from);

    //next(false) can cancel open next page
    next();
    
});

const app = createApp(App);

app.use(router);

app.mount('#app');
