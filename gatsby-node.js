const path = require("path");

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "lib"), "node_modules"]
    }
  });
};

exports.createPages = async ({ graphql, actions }) => {
  // Keep up Travis build
  function keepItUp() {
    console.log("\nStill working…\n");
    setTimeout(keepItUp, 300000);
  }
  setTimeout(keepItUp, 300000);

  const { createPage } = actions;

  const sanitizeLang = str => (str === "pl" ? "pl" : "en");

  /* ASSIGN TEMPLATES */
  const AboutTpl = path.resolve("lib/ui/templates/AboutTpl.js");
  // const ArticlesTpl = path.resolve("lib/ui/templates/ArticlesTpl.js");
  const ContactTpl = path.resolve("lib/ui/templates/ContactTpl.js");
  const HomeTpl = path.resolve("lib/ui/templates/HomeTpl.js");
  const NewsTpl = path.resolve("lib/ui/templates/NewsTpl.js");
  const ProjectsTpl = path.resolve("lib/ui/templates/ProjectsTpl.js");
  const WorksTpl = path.resolve("lib/ui/templates/WorksTpl.js");

  /* FETCH DATA */
  // const articles = await graphql(`
  //   {
  //     allPrismicArticles {
  //       edges {
  //         node {
  //           uid
  //           lang
  //         }
  //       }
  //     }
  //   }
  // `);
  const news = await graphql(`
    {
      allPrismicNews {
        edges {
          node {
            uid
            lang
          }
        }
      }
    }
  `);
  const pages = await graphql(`
    {
      allPrismicPages {
        edges {
          node {
            uid
            lang
          }
        }
      }
    }
  `);
  const projects = await graphql(`
    {
      allPrismicProjects {
        edges {
          node {
            uid
            lang
          }
        }
      }
    }
  `);
  const works = await graphql(`
    {
      allPrismicWorks {
        edges {
          node {
            uid
            lang
          }
        }
      }
    }
  `);

  /* CREATE PAGES */

  const creators = [
    // {
    //   id: articles,
    //   gql: "allPrismicArticles",
    //   locale: ["artykuly", "articles"],
    //   tpl: ArticlesTpl,
    //   excludes: "articleschema"
    // },
    {
      id: news,
      gql: "allPrismicNews",
      locale: ["aktualnosci", "news"],
      tpl: NewsTpl,
      excludes: "newsschema"
    },
    {
      id: projects,
      gql: "allPrismicProjects",
      locale: ["projekty", "projects"],
      tpl: ProjectsTpl,
      excludes: "projectsschema"
    },
    {
      id: works,
      gql: "allPrismicWorks",
      locale: ["realizacje", "works"],
      tpl: WorksTpl,
      excludes: "worksschema"
    },
    /* Pages are a lil’ different | TODO: create only these by slug in the future */
    {
      id: pages,
      gql: "allPrismicPages"
    }
  ];

  creators.forEach(creator => {
    const { id, gql, locale, tpl } = creator;
    const { edges } = id.data[gql];

    if (edges.length > 0) {
      edges.forEach(edge => {
        const { uid, lang } = edge.node;

        const escapists = [
          "articlesschema",
          "newsschema",
          "pagesschema",
          "projectsschema",
          "worksschema"
        ];

        if (escapists.includes(uid)) {
          return null;
        }
        const lingo = sanitizeLang(lang);
        const isUnique = gql === "allPrismicPages";

        // detect unique pages
        const isAboutPage = ["o-nas", "about-us"].includes(uid);
        const isContactPage = ["kontakt", "contact"].includes(uid);
        const isHomePage = ["strona-domowa", "home-page"].includes(uid);

        // define paths
        const getPath = () => {
          if (isUnique && isHomePage) {
            return lingo;
          }
          if (isUnique && !isHomePage) {
            return `${lingo}/${uid}`;
          }
          return `${lingo}/${lang === "pl" ? locale[0] : locale[1]}/${uid}`;
        };

        // assign templates
        const getTpl = () => {
          if (isHomePage) {
            return HomeTpl;
          }
          if (isAboutPage) {
            return AboutTpl;
          }
          if (isContactPage) {
            return ContactTpl;
          }
          return tpl;
        };

        // create pages
        createPage({
          path: getPath(),
          component: getTpl(),
          context: {
            uid
          }
        });
      });
    }
  });
};
