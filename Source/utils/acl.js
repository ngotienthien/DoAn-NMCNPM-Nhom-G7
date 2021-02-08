const node_acl = require('acl');

const acl = new node_acl(new node_acl.memoryBackend(), {
    debug: (msg) => {
      console.log('-DEBUG-', msg);
    }
});


//list permission for every user
acl.allow([
    {
      roles: 'admin',
      allows: [
        {
          resources: ['/manage/categories', '/manage/tags', '/manage/users'],
          permissions: '*'
        },
      ]
    },

    {
        roles: 'writer',
        allows: [
          {
            resources: ['/manage/articles/write', '/manage/articles/edit', '/manage/articles/delete' ],
            permissions: '*'
          },
        ]
    },

    {
        roles: 'editor',
        allows: [
          {
            resources: ['/manage/articles/deny', '/manage/articles/publish', '/manage/articles/publishNow' ],
            permissions: '*'
          },
        ]
    },

    {
      roles: 'userManage',
      allows: [
        {
          resources: ['/manage', '/manage/articles', '/manage/articles/listdraft', '/manage/articles/listdenied',
                      '/manage/articles/listapproved', '/manage/articles/listpublished',  
                      '/manage/articles/details', ],
          permissions: '*'
        },
      ]
  },

    
    // {
    //     roles: 'subscriber',
    //     allows: [
    //       {
    //         resources: '/premium',
    //         permissions: '*'
    //       },
    //     ]
    // },
    
]);

acl.addRoleParents('writer', 'userManage');
acl.addRoleParents('editor', 'userManage');
acl.addRoleParents('admin', 'editor');
acl.addRoleParents('admin', 'writer');

acl.addUserRoles("adminitrator", "admin");
acl.addUserRoles("writer", "writer");
acl.addUserRoles("editor", "editor");
// acl.addUserRoles("subscriber", "subscriber");

// function getUserId(req) {    
//     return req.session.passport.user.TypeOfUser; // (yaoming) just for fun
// }

module.exports = acl;
  