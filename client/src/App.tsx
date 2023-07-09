// routing
import Routes from 'routes';

// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import ThemeCustomization from 'themes';

// auth provider
import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
import { regSw, subscribe } from 'swDev';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';

// ==============================|| APP ||============================== //

const App = () => {
    async function registerAndSubscribe() {
        try {
            const serviceWorkerReg = await regSw();
            await subscribe(serviceWorkerReg);
        } catch (error) {
            console.log(error);
        }
    }
    registerAndSubscribe();

    return (
        <ThemeCustomization>
            {/* RTL layout */}

            <RTLLayout>
                <Locales>
                    <NavigationScroll>
                        <AuthProvider>
                            <>
                                <Routes />
                                <Snackbar />
                            </>
                        </AuthProvider>
                    </NavigationScroll>
                </Locales>
            </RTLLayout>
        </ThemeCustomization>
    );
};
export default App;
// async function registerAndSubscribe () {
//     try {
//       const serviceWorkerReg = await regSw ();
//       await subscribe(serviceWorkerReg);
//     } catch (error) {
//       console.log (error);
//     }
//   }
//   registerAndSubscribe()
