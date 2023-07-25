import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Clients from "./components/Clients";
import 'bootstrap/dist/css/bootstrap.min.css';
import HorizontalNavbar from "./components/Navbar";
import Projects from "./components/Projects";
import AddButtons from "./components/AddButtons";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProjectDetails from "./components/ProjectDetails";
import DisplayPage from "./components/DisplayPage";


const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <div className="App">
          <HorizontalNavbar />

          <Routes>
            {/* <Route path="/" element={<Layout />}> */}
              <Route index element={<DisplayPage />} />
              <Route path="projects/:id" element={<ProjectDetails />} />
            {/* </Route> */}
          </Routes>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
