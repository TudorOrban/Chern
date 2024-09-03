declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module '@vue/runtime-core' {
    import AuthService from './services/AuthService';
    interface ComponentCustomProperties {
        $authService: AuthService;
    }
}