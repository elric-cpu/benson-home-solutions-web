# Metabase & Supabase Deployment Plan

This document provides a comprehensive guide to deploying a Metabase instance, connecting it to a Supabase database, and visualizing your `mrr_analytics` view.

---

### **Part 1: Supabase Database Preparation (Security First)**

Before deploying Metabase, prepare your Supabase database by creating a dedicated, read-only user. This is a critical security measure to ensure Metabase can only read data and cannot modify your database structure or content.

1.  **Navigate to the Supabase SQL Editor:**
    *   Open your Supabase project.
    *   Go to the **SQL Editor** section.
    *   Click **"New query"**.

2.  **Execute the Read-Only User Script:**
    *   Run the following SQL script. Replace `YourSecurePassword` with a strong, unique password.

    ```sql
    -- Create a new role (user) for Metabase with a secure password
    CREATE ROLE metabase_user WITH LOGIN PASSWORD 'YourSecurePassword';

    -- Grant the ability to connect to the database
    GRANT CONNECT ON DATABASE postgres TO metabase_user;

    -- Grant USAGE permission on the public schema. This allows the user to "see" the schema.
    GRANT USAGE ON SCHEMA public TO metabase_user;

    -- Grant SELECT permission on your specific view. This is the ONLY data the user can read.
    GRANT SELECT ON TABLE public.mrr_analytics TO metabase_user;

    -- If you have other tables or views you want Metabase to access, grant permission here.
    -- Example: GRANT SELECT ON TABLE public.another_table TO metabase_user;

    -- IMPORTANT: For future tables, you'll need to grant permissions explicitly.
    -- To grant access to all FUTURE tables/views in the public schema (use with caution):
    -- ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO metabase_user;
    ```

3.  **Store the Password Securely:** Save the password you created in a password manager. You will need it later.

---

### **Part 2: Metabase Deployment Options**

Choose the deployment option that best fits your technical comfort level and budget.

#### **Option A: Self-Hosted with Docker (Recommended for Control)**

This method gives you full control over your instance. You are responsible for updates and maintenance.

1.  **Prerequisites:**
    *   A server (e.g., a DigitalOcean Droplet, EC2 instance, or a local machine).
    *   Docker installed on the server.

2.  **Deployment Command:**
    *   Run the following command in your server's terminal. This command starts Metabase and ensures its application data is persisted on the host machine.

    ```bash
    docker run -d -p 3000:3000 \
      -v /path/to/metabase-data:/metabase-data \
      -e "MB_DB_FILE=/metabase-data/metabase.db" \
      --name metabase metabase/metabase
    ```

    *   **Explanation:**
        *   `-d`: Runs the container in detached mode (in the background).
        *   `-p 3000:3000`: Maps port 3000 on your server to port 3000 inside the container. You can access Metabase at `http://your_server_ip:3000`.
        *   `-v /path/to/metabase-data:/metabase-data`: **CRITICAL!** This mounts a directory from your server (`/path/to/metabase-data`) into the container. This is where Metabase saves its own data (users, dashboards, etc.). **Without this, you will lose all your work when the container is removed or updated.**
        *   `-e "MB_DB_FILE=/metabase-data/metabase.db"`: Tells Metabase to use the mounted volume for its application database.
        *   `--name metabase`: Gives the container a memorable name.

#### **Option B: Cloud-Based with DigitalOcean App Platform (Easy & Scalable)**

This is a great "hands-off" option that handles deployment, scaling, and SSL for you.

1.  **Go to the DigitalOcean App Platform page.**
2.  Click **"Create App"**.
3.  Choose **"Docker Hub"** as the source.
4.  For **Repository**, enter `metabase/metabase`.
5.  The App Platform will detect the settings. It will automatically set up an HTTP port on 3000.
6.  Choose a plan that fits your needs (the basic plan is often sufficient to start).
7.  Launch the app. DigitalOcean will provide you with a public URL (e.g., `https://your-app-name-xyz.ondigitalocean.app`).

#### **Option C: Cloud-Based with Heroku (Easy Start)**

Heroku is famous for its ease of use, but be mindful of costs as your usage grows.

1.  **Go to the Metabase on Heroku GitHub repository:** [https://github.com/metabase/metabase-deploy](https://github.com/metabase/metabase-deploy)
2.  Click the **"Deploy to Heroku"** button.
3.  Follow the on-screen instructions to create the app.
4.  **Note:** The free Heroku plan will cause your Metabase instance to "sleep," leading to slow initial load times. For serious use, upgrade to a paid Hobby or Standard dyno.

---

### **Part 3: Connecting Metabase to Supabase**

Once Metabase is running, it's time to connect your Supabase database.

1.  **Get Supabase Connection Details:**
    *   In your Supabase project, go to **Settings -> Database**.
    *   Scroll down to **Connection Info**.
    *   You will need the following details: **Host**, **Port**, **Database name** (`postgres`), **User** (`metabase_user`), and the **Password** you created in Part 1.

2.  **Add Database in Metabase:**
    *   Open your Metabase instance in your browser.
    *   You will be greeted with a setup wizard. When asked to add your data, select **PostgreSQL**.
    *   If you've already set up Metabase, go to **Settings (gear icon) -> Admin Settings -> Databases -> Add database**.
    *   Fill in the form with the connection details from Supabase:
        *   **Database Type:** PostgreSQL
        *   **Display Name:** Supabase Prod (or another descriptive name)
        *   **Host:** `db.your-project-ref.supabase.co`
        *   **Port:** `5432`
        *   **Database Name:** `postgres`
        *   **Username:** `metabase_user`
        *   **Password:** The `YourSecurePassword` you created earlier.
        *   **SSL:** Make sure the **"Use a secure connection (SSL)"** toggle is **enabled**.

3.  **Save and Sync:** Click **"Save"**. Metabase will test the connection and then sync with your database. This initial sync can take a few minutes.

---

### **Part 4: Visualizing the `mrr_analytics` View**

After the sync is complete, you can start exploring your data.

1.  **Browse Data:** In the Metabase main menu, click **"Browse Data"**.
2.  **Select Your Database:** Click on the "Supabase Prod" (or whatever you named it) database.
3.  **Find Your View:** You will see a list of tables and views. Your `mrr_analytics` view will be listed here.
4.  **Ask a Question:** Click on `mrr_analytics`. You can now:
    *   **Explore the data:** View the raw data in the view.
    *   **Visualize:** Click the "Visualize" button to start creating charts and graphs using Metabase's intuitive query builder without writing any SQL.
    *   **Write SQL:** For more complex queries, click the "Editor" icon to open the SQL editor.

---

### **Part 5: Security Best Practices**

*   **Read-Only User:** You have already implemented the most important step.
*   **Enable HTTPS:** If using Docker, place your Metabase instance behind a reverse proxy like Nginx or Caddy to handle SSL certificates (HTTPS). Heroku and DigitalOcean handle this automatically.
*   **Strong Passwords:** Use strong, unique passwords for your Metabase admin account.
*   **Restrict Access:** If self-hosting, use a firewall (`ufw`, `iptables`, or your cloud provider's firewall) to restrict access to the Metabase port (3000) to known IP addresses if possible.
*   **SSO/Google Sign-In:** In Metabase Admin settings, configure Google Sign-In or SAML. This enhances security by removing the need for separate passwords and simplifies user management.

---

### **Part 6: Ongoing Maintenance**

*   **Backups:**
    *   **Docker:** Regularly back up the volume you mounted (`/path/to/metabase-data`). This single directory contains all of your Metabase application data.
    *   **Cloud:** Heroku and DigitalOcean offer database backup solutions as part of their paid plans.
*   **Updates:**
    *   **Docker:** Updating is easy. Stop the old container, pull the new image, and start a new container with the same volume mount.
        ```bash
        docker stop metabase
        docker rm metabase
        docker pull metabase/metabase
        # Run the same docker run command from Part 2
        ```
    *   **Cloud:** Follow the provider's instructions for updating your application.
*   **Monitoring:** Periodically check the Metabase logs for any errors. In Metabase, go to **Admin Settings -> Troubleshooting -> Logs**.
