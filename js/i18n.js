const STRINGS = {
  en: {
    app_name: "Titbits",
    tagline: "See it all. Build the habit. Reach your freedom.",
    nav: { dashboard: "Dashboard", add_entry: "Add Entry", transactions: "Transactions", budget: "Budget", emergency_fund: "Emergency Fund", investments: "Investments",
      simulation: "Simulation", profile_tool: "Investment Profile", sentiment: "Market Sentiment", alerts: "Alerts",
      settings: "Settings", bank_connect: "Connect Accounts", logout: "Log out", login: "Log in", signup: "Sign up" },
    landing: {
      hero_title: "Financial discipline, finally visible.",
      hero_sub: "Titbits tracks every expense, watches every investment, and tells you exactly what to do next — before problems compound.",
      cta_start: "Get started free", cta_login: "I already have an account",
      f1_title: "Track in under 15 seconds", f1_body: "Fast entry for income and expenses, with smart category defaults.",
      f2_title: "50/30/20, at a glance", f2_body: "See Needs, Wants and Savings against target — no math required.",
      f3_title: "Alerts before you slip", f3_body: "Warnings before you miss an investment contribution or your emergency fund drops.",
      f4_title: "Simulate your future", f4_body: "Project your capital growth years ahead, with assumptions always shown.",
      privacy_note: "Your data stays in your browser. Nothing is shared without your explicit consent."
    },
    auth: {
      login_title: "Welcome back", signup_title: "Create your account",
      email: "Email", password: "Password", confirm_password: "Confirm password",
      login_button: "Log in", signup_button: "Create account",
      no_account: "New to Titbits?", have_account: "Already have an account?",
      create_one: "Create an account", log_in_link: "Log in",
      error_mismatch: "Passwords don't match.", error_exists: "An account with that email already exists.",
      error_invalid: "Incorrect email or password.", error_weak: "Use at least 6 characters.",
      demo_note: "This runs entirely in your browser — please don't reuse a real password you use elsewhere.",
      first_name: "First name", last_name: "Last name", date_of_birth: "Date of birth", country: "Country",
      select_country: "Select your country",
      verify_title: "Verify your email", verify_body: "This demo has no real email server, so we can't send you an actual email. Here's the code that would have been sent to {email}:",
      verify_code_label: "Enter the 6-digit code", verify_button: "Verify email", skip_verification: "Skip for now",
      resend_code: "Resend code", code_resent: "New code generated below.",
      error_code_invalid: "That code doesn't match. Try again.", verified_success: "Email verified!"
    },
    onboarding: {
      title: "Let's set up your picture", step: "Step",
      salary_label: "Monthly salary (USD)", salary_help: "Your fixed take-home pay per month. You can change this anytime.",
      pay_frequency_label: "Pay frequency",
      freq_monthly: "Monthly", freq_biweekly: "Bi-weekly", freq_weekly: "Weekly",
      ef_label: "Current emergency fund balance (USD)", ef_help: "Start at 0 if you're beginning fresh — that's a normal starting point.",
      avg_expense_label: "Estimated average monthly expenses (USD)", avg_expense_help: "We use this to calculate your 6-month emergency fund target. You can refine this later from real data.",
      holdings_title: "Any existing investments? (optional)", holdings_skip: "Skip for now, I'll add these later",
      notif_title: "How should we reach you?", notif_help: "In-app alerts always work. Email and push need a connected notification service — you can enable those later in Settings.",
      finish: "Go to my dashboard", back: "Back", next: "Continue"
    },
    dashboard: {
      title: "Dashboard", welcome: "Welcome back",
      budget_title: "This month's 50/30/20", ef_title: "Emergency Fund", invest_title: "Investment Contribution",
      recent_alerts: "Recent Alerts", no_alerts: "No alerts right now — you're on track.",
      needs: "Needs", wants: "Wants", savings: "Savings",
      target: "target", spent: "spent", of: "of",
      ef_progress: "of 6-month target", invest_progress: "of 15% monthly target",
      quick_add: "Add expense", quick_add_income: "Add income",
      empty_title: "No data yet", empty_body: "Log your first income or expense to see your picture come together.",
      view_all_alerts: "View all alerts",
      add_extra_income: "Add extra income", extra_income_modal_title: "Add extra income",
      choose_bucket: "Where should this go? Split across categories however you like.",
      alloc_needs: "Needs", alloc_wants: "Wants", alloc_savings: "Savings", alloc_investment: "Investment",
      total_must_equal_100: "Percentages must add up to 100%.", save_allocation: "Add income",
      cycle_label: "Reset cycle", cycle_help: "Needs/Wants/Savings and your investment tracker automatically reset at the start of each new cycle.",
      cycle_option: "Every {days} days"
    },
    budget: {
      title: "Budget Planner", subtitle: "Build a full budget line by line, then compare it against what actually happened.",
      group_needs: "Needs", group_wants: "Wants", group_savings: "Savings", group_investments: "Investments", group_debts: "Debts",
      planned: "Planned", actual: "Actual", difference: "Difference", total: "Total",
      add_custom: "+ Add line", custom_line_prompt: "Name this budget line", remove: "Remove",
      save: "Save budget", saved: "Budget saved.",
      vs_reality_title: "Budget vs. Reality (this cycle)", no_lines: "No lines in this section yet.",
      advice_title: "Financial advice", advice_group_over: "You're at {pct}% of your {group} budget for this cycle — worth a closer look.",
      advice_line_over: "{label} is ${over} over budget this cycle.", advice_line_under: "{label} is ${under} under budget — nicely controlled.",
      advice_no_investment: "You planned an investment budget but haven't logged any investment contributions this cycle yet.",
      advice_high_debt: "Debt payments make up a large share of your spending this cycle — consider prioritizing extra payments toward your highest-interest debt.",
      advice_on_track: "Overall you're at or under your total planned budget for this cycle — keep it up.",
      advice_none: "Set planned amounts on a few lines to start getting personalized advice."
    },
    entry: {
      title: "Add Entry", type: "Type", income: "Income", expense: "Expense",
      amount: "Amount (USD)", date: "Date", category: "Category", source: "Source",
      note: "Note (optional)", recurring: "This repeats every month", one_off: "One-off / planned (won't trigger overspend alerts)",
      save: "Save entry", saved: "Saved!", pick_category: "Choose a category",
      cat_needs: "Needs", cat_wants: "Wants", cat_savings: "Savings / Debt",
      categories: {
        rent: "Rent / Mortgage", utilities: "Utilities", groceries: "Food / Groceries", transportation: "Transportation",
        insurance: "Insurance", debt: "Debt Payments", healthcare: "Healthcare", other_needs: "Other Needs",
        electricity: "Electricity", water: "Water", school_fees: "School Fees", phone_internet: "Phone / Internet",
        dining: "Dining Out", entertainment: "Entertainment", shopping: "Shopping", travel: "Travel",
        subscriptions: "Subscriptions", hobbies: "Hobbies", other_wants: "Other Wants",
        emergency_fund: "Emergency Fund", investment: "Investment", extra_debt: "Extra Debt Payment", other_savings: "Other Savings",
        general_savings: "General Savings",
        investment_contributions: "Investment Contributions", retirement: "Retirement", real_estate: "Real Estate", stocks_etfs: "Stocks / ETFs",
        credit_card: "Credit Card", student_loan: "Student Loan", car_loan: "Car Loan", personal_loan: "Personal Loan"
      },
      income_sources: { salary: "Salary", freelance: "Freelance", bonus: "Bonus", gift: "Gift", other_income: "Other" },
      recent_entries: "Recent entries", no_entries: "No entries yet.", delete: "Delete"
    },
    ef: {
      title: "Emergency Fund", current_balance: "Current balance", target: "Target (6 months of expenses)",
      monthly_expense_figure: "Monthly expense figure used", edit_target: "Edit target figure",
      log_transaction: "Log a transaction", contribution: "Contribution", withdrawal: "Withdrawal",
      history: "Transaction history", no_history: "No transactions logged yet.",
      auto_suggest: "Suggest from my logged expenses", months_covered: "months of expenses covered"
    },
    inv: {
      title: "Investments", total_value: "Total portfolio value", total_contributed: "Total contributed",
      gain_loss: "Gain / Loss", allocation: "Allocation by type",
      add_holding: "Add holding", holding_type: "Type", stock: "Stock", etf: "ETF", bond: "Bond", other: "Other",
      name_ticker: "Name / Ticker", quantity: "Quantity", cost_basis: "Cost basis (total, USD)",
      current_value: "Current value (total, USD)", date_acquired: "Date acquired",
      holdings_list: "Your holdings", no_holdings: "No holdings logged yet.",
      contribution_title: "Monthly Investment Target (15% of salary)", log_contribution: "Log a contribution",
      contribution_amount: "Amount contributed", contribution_history: "Contribution history",
      adherence: "adherence this month", stale_note: "Values are as you last entered them — connect a live price feed later for real-time updates."
    },
    sim: {
      title: "Growth Simulation", disclaimer: "This is a projection based on your assumptions — not a guarantee of future results.",
      current_capital: "Current capital (USD)", monthly_contribution: "Monthly contribution (USD)",
      years: "Projection length (years)", rate_preset: "Assumed annual return",
      conservative: "Conservative (4%)", moderate: "Moderate (7%)", aggressive: "Aggressive (10%)", custom: "Custom",
      custom_rate: "Custom annual rate (%)", run: "Run simulation",
      projected_value: "Projected value after {years} years", total_contributed: "Total you will have contributed",
      growth_from_returns: "Growth from returns"
    },
    profile: {
      title: "Investment Profile", intro: "A few questions to shape suggestions to your situation. This never places a trade — it only suggests categories to research.",
      risk_q: "How would you describe your risk tolerance?", risk_conservative: "Conservative — protect what I have",
      risk_moderate: "Moderate — balanced growth", risk_aggressive: "Aggressive — maximize long-term growth",
      goal_q: "What's your primary goal?", goal_retirement: "Retirement", goal_house: "Buying a home",
      goal_wealth: "General wealth growth", goal_education: "Education",
      horizon_q: "Time horizon", horizon_short: "Under 3 years", horizon_mid: "3–7 years", horizon_long: "7+ years",
      submit: "Get suggestions", result_title: "Suggested allocation categories",
      not_advice: "Informational only — not a trade order or personalized financial advice. Consider speaking with a licensed advisor for decisions that matter.",
      retake: "Retake questionnaire"
    },
    sentiment: {
      title: "Market Sentiment", demo_note: "Demo data shown for the asset types you hold. Connect a live market data provider to replace this with real sentiment.",
      no_holdings: "Add an investment holding to see sentiment for your asset types.",
      bullish: "Bullish", neutral: "Neutral", bearish: "Bearish"
    },
    alerts: {
      title: "Alerts", filter_all: "All", filter_unread: "Unread", mark_read: "Mark read", dismiss: "Dismiss",
      no_alerts: "Nothing here yet.", why: "Why this matters", suggestion: "Suggested action",
      types: { budget: "Budget", ef: "Emergency Fund", invest: "Investment Contribution", sim: "Simulation" },
      budget_title: "{bucket}: {pct}% spent", budget_why: "${spent} of ${allowance} {bucket} target spent — {days} day(s) left this month.",
      budget_suggestion_needs: "Review upcoming fixed bills for anything that can be deferred, and hold off on new commitments in this category until next month.",
      budget_suggestion_wants: "Pause new {bucket} purchases for the rest of the month to stay on track.",
      budget_suggestion_savings: "You're ahead on savings/debt this month — no action needed, this is a positive trend.",
      ef_title: "Emergency fund trending below target",
      ef_why: "Your emergency fund is ${gap} below its 6-month target of ${target}, and no contribution has been logged this month.",
      ef_suggestion: "Log a contribution to your emergency fund before month-end, even a small one, to keep it moving toward target.",
      invest_title: "Investment contribution at risk of being missed",
      invest_why: "You've contributed ${contributed} of your ${target} (15% of salary) target this month, with {days} day(s) left.",
      invest_suggestion: "Log ${remaining} by the end of the month to stay on track with your 15% investment rate."
    },
    settings: {
      title: "Settings", language: "Language", currency: "Currency", currency_note: "Fixed to USD for now.",
      notif_prefs: "Notification preferences", channel_inapp: "In-app", channel_email: "Email", channel_push: "Push",
      channel_note: "Email and push require a connected notification service and are not yet delivered outside the app.",
      account: "Account", email_label: "Email", export_data: "Export my data (JSON)", delete_account: "Delete account",
      delete_confirm: "This permanently deletes all your Titbits data from this browser. Continue?"
    },
    bank: {
      title: "Connect Accounts", body: "Automatic import from a bank card or MonCash is planned for a future phase, and requires a licensed data-connection provider that hasn't been set up yet.",
      manual_note: "Manual entry stays fully available and is never removed — nothing here changes how you track today.",
      cta: "Notify me when this is ready", notified: "We'll let you know.",
      connect_bank: "Connect bank / card", connect_moncash: "Connect MonCash"
    },
    topbar: {
      greeting: "Hi {name}", change_photo: "Change photo", upload_photo: "Add photo"
    },
    transactions: {
      title: "Transactions", subtitle: "All your income and expenses, like a bank statement.",
      filter_month: "Month", all_types: "All", income_only: "Income", expense_only: "Expenses",
      total_income: "Total income", total_expenses: "Total expenses", net: "Net",
      download_csv: "Download CSV", print_report: "Print monthly report",
      no_transactions: "No transactions for this month.", date: "Date", description: "Description", category: "Category", type: "Type", amount: "Amount",
      view_link: "View transactions & report"
    },
    common: {
      save: "Save", cancel: "Cancel", edit: "Edit", close: "Close", loading: "Loading…",
      required: "Required", usd: "USD", back_to_dashboard: "Back to dashboard"
    }
  },

  fr: {
    app_name: "Titbits",
    tagline: "Tout voir. Construire l'habitude. Atteindre votre liberté.",
    nav: { dashboard: "Tableau de bord", add_entry: "Ajouter", transactions: "Transactions", budget: "Budget", emergency_fund: "Fonds d'urgence", investments: "Investissements",
      simulation: "Simulation", profile_tool: "Profil d'investissement", sentiment: "Sentiment du marché", alerts: "Alertes",
      settings: "Paramètres", bank_connect: "Connecter des comptes", logout: "Déconnexion", login: "Connexion", signup: "Inscription" },
    landing: {
      hero_title: "La discipline financière, enfin visible.",
      hero_sub: "Titbits suit chaque dépense, surveille chaque investissement et vous dit exactement quoi faire ensuite — avant que les problèmes ne s'aggravent.",
      cta_start: "Commencer gratuitement", cta_login: "J'ai déjà un compte",
      f1_title: "Suivi en moins de 15 secondes", f1_body: "Saisie rapide des revenus et dépenses, avec des catégories par défaut intelligentes.",
      f2_title: "50/30/20, en un coup d'œil", f2_body: "Visualisez Besoins, Envies et Épargne par rapport à l'objectif — sans calcul.",
      f3_title: "Alertes avant de déraper", f3_body: "Avertissements avant de manquer une contribution d'investissement ou que votre fonds d'urgence baisse.",
      f4_title: "Simulez votre avenir", f4_body: "Projetez la croissance de votre capital, avec les hypothèses toujours affichées.",
      privacy_note: "Vos données restent dans votre navigateur. Rien n'est partagé sans votre consentement explicite."
    },
    auth: {
      login_title: "Content de vous revoir", signup_title: "Créez votre compte",
      email: "E-mail", password: "Mot de passe", confirm_password: "Confirmer le mot de passe",
      login_button: "Connexion", signup_button: "Créer un compte",
      no_account: "Nouveau sur Titbits ?", have_account: "Déjà un compte ?",
      create_one: "Créer un compte", log_in_link: "Connexion",
      error_mismatch: "Les mots de passe ne correspondent pas.", error_exists: "Un compte avec cet e-mail existe déjà.",
      error_invalid: "E-mail ou mot de passe incorrect.", error_weak: "Utilisez au moins 6 caractères.",
      demo_note: "Ceci fonctionne entièrement dans votre navigateur — merci de ne pas réutiliser un mot de passe réel.",
      first_name: "Prénom", last_name: "Nom", date_of_birth: "Date de naissance", country: "Pays",
      select_country: "Sélectionnez votre pays",
      verify_title: "Vérifiez votre e-mail", verify_body: "Cette démo n'a pas de vrai serveur e-mail, nous ne pouvons donc pas vous envoyer un e-mail réel. Voici le code qui aurait été envoyé à {email} :",
      verify_code_label: "Entrez le code à 6 chiffres", verify_button: "Vérifier l'e-mail", skip_verification: "Ignorer pour l'instant",
      resend_code: "Renvoyer le code", code_resent: "Nouveau code généré ci-dessous.",
      error_code_invalid: "Ce code ne correspond pas. Réessayez.", verified_success: "E-mail vérifié !"
    },
    onboarding: {
      title: "Configurons votre situation", step: "Étape",
      salary_label: "Salaire mensuel (USD)", salary_help: "Votre revenu net fixe par mois. Modifiable à tout moment.",
      pay_frequency_label: "Fréquence de paie",
      freq_monthly: "Mensuelle", freq_biweekly: "Bimensuelle", freq_weekly: "Hebdomadaire",
      ef_label: "Solde actuel du fonds d'urgence (USD)", ef_help: "Commencez à 0 si vous débutez — c'est normal.",
      avg_expense_label: "Dépenses mensuelles moyennes estimées (USD)", avg_expense_help: "Utilisé pour calculer votre objectif de fonds d'urgence de 6 mois. Affinable plus tard.",
      holdings_title: "Des investissements existants ? (optionnel)", holdings_skip: "Ignorer pour l'instant, j'ajouterai plus tard",
      notif_title: "Comment vous contacter ?", notif_help: "Les alertes dans l'application fonctionnent toujours. E-mail et push nécessitent un service connecté — activables plus tard.",
      finish: "Aller au tableau de bord", back: "Retour", next: "Continuer"
    },
    dashboard: {
      title: "Tableau de bord", welcome: "Content de vous revoir",
      budget_title: "50/30/20 de ce mois", ef_title: "Fonds d'urgence", invest_title: "Contribution d'investissement",
      recent_alerts: "Alertes récentes", no_alerts: "Aucune alerte pour l'instant — vous êtes sur la bonne voie.",
      needs: "Besoins", wants: "Envies", savings: "Épargne",
      target: "objectif", spent: "dépensé", of: "sur",
      ef_progress: "de l'objectif 6 mois", invest_progress: "de l'objectif mensuel de 15%",
      quick_add: "Ajouter une dépense", quick_add_income: "Ajouter un revenu",
      empty_title: "Aucune donnée", empty_body: "Enregistrez votre premier revenu ou dépense pour voir votre situation se dessiner.",
      view_all_alerts: "Voir toutes les alertes",
      add_extra_income: "Ajouter un revenu supplémentaire", extra_income_modal_title: "Ajouter un revenu supplémentaire",
      choose_bucket: "Où doit aller cet argent ? Répartissez-le comme vous voulez.",
      alloc_needs: "Besoins", alloc_wants: "Envies", alloc_savings: "Épargne", alloc_investment: "Investissement",
      total_must_equal_100: "Les pourcentages doivent totaliser 100%.", save_allocation: "Ajouter le revenu",
      cycle_label: "Cycle de réinitialisation", cycle_help: "Besoins/Envies/Épargne et votre suivi d'investissement se réinitialisent automatiquement au début de chaque nouveau cycle.",
      cycle_option: "Tous les {days} jours"
    },
    budget: {
      title: "Planificateur de budget", subtitle: "Construisez un budget ligne par ligne, puis comparez-le à la réalité.",
      group_needs: "Besoins", group_wants: "Envies", group_savings: "Épargne", group_investments: "Investissements", group_debts: "Dettes",
      planned: "Prévu", actual: "Réel", difference: "Différence", total: "Total",
      add_custom: "+ Ajouter une ligne", custom_line_prompt: "Nommez cette ligne budgétaire", remove: "Supprimer",
      save: "Enregistrer le budget", saved: "Budget enregistré.",
      vs_reality_title: "Budget vs réalité (ce cycle)", no_lines: "Aucune ligne dans cette section pour l'instant.",
      advice_title: "Conseils financiers", advice_group_over: "Vous êtes à {pct}% de votre budget {group} pour ce cycle — à surveiller de près.",
      advice_line_over: "{label} dépasse le budget de {over}$ ce cycle.", advice_line_under: "{label} est {under}$ en dessous du budget — bien maîtrisé.",
      advice_no_investment: "Vous avez prévu un budget d'investissement mais n'avez enregistré aucune contribution ce cycle.",
      advice_high_debt: "Les paiements de dette représentent une grande part de vos dépenses ce cycle — envisagez de prioriser des paiements supplémentaires sur votre dette au taux le plus élevé.",
      advice_on_track: "Dans l'ensemble, vous êtes à ou en dessous de votre budget total prévu pour ce cycle — continuez ainsi.",
      advice_none: "Définissez des montants prévus sur quelques lignes pour recevoir des conseils personnalisés."
    },
    entry: {
      title: "Ajouter une entrée", type: "Type", income: "Revenu", expense: "Dépense",
      amount: "Montant (USD)", date: "Date", category: "Catégorie", source: "Source",
      note: "Note (optionnel)", recurring: "Se répète chaque mois", one_off: "Ponctuel / prévu (n'alertera pas)",
      save: "Enregistrer", saved: "Enregistré !", pick_category: "Choisir une catégorie",
      cat_needs: "Besoins", cat_wants: "Envies", cat_savings: "Épargne / Dette",
      categories: {
        rent: "Loyer / Hypothèque", utilities: "Services publics", groceries: "Alimentation / Épicerie", transportation: "Transport",
        insurance: "Assurance", debt: "Paiements de dette", healthcare: "Santé", other_needs: "Autres besoins",
        electricity: "Électricité", water: "Eau", school_fees: "Frais de scolarité", phone_internet: "Téléphone / Internet",
        dining: "Restaurants", entertainment: "Divertissement", shopping: "Achats", travel: "Voyage",
        subscriptions: "Abonnements", hobbies: "Loisirs", other_wants: "Autres envies",
        emergency_fund: "Fonds d'urgence", investment: "Investissement", extra_debt: "Dette supplémentaire", other_savings: "Autre épargne",
        general_savings: "Épargne générale",
        investment_contributions: "Contributions d'investissement", retirement: "Retraite", real_estate: "Immobilier", stocks_etfs: "Actions / FNB",
        credit_card: "Carte de crédit", student_loan: "Prêt étudiant", car_loan: "Prêt auto", personal_loan: "Prêt personnel"
      },
      income_sources: { salary: "Salaire", freelance: "Freelance", bonus: "Prime", gift: "Cadeau", other_income: "Autre" },
      recent_entries: "Entrées récentes", no_entries: "Aucune entrée pour l'instant.", delete: "Supprimer"
    },
    ef: {
      title: "Fonds d'urgence", current_balance: "Solde actuel", target: "Objectif (6 mois de dépenses)",
      monthly_expense_figure: "Dépense mensuelle utilisée", edit_target: "Modifier l'objectif",
      log_transaction: "Enregistrer une transaction", contribution: "Contribution", withdrawal: "Retrait",
      history: "Historique des transactions", no_history: "Aucune transaction enregistrée.",
      auto_suggest: "Suggestion à partir de mes dépenses", months_covered: "mois de dépenses couverts"
    },
    inv: {
      title: "Investissements", total_value: "Valeur totale du portefeuille", total_contributed: "Total contribué",
      gain_loss: "Gain / Perte", allocation: "Répartition par type",
      add_holding: "Ajouter une position", holding_type: "Type", stock: "Action", etf: "FNB", bond: "Obligation", other: "Autre",
      name_ticker: "Nom / Symbole", quantity: "Quantité", cost_basis: "Coût de base (total, USD)",
      current_value: "Valeur actuelle (total, USD)", date_acquired: "Date d'acquisition",
      holdings_list: "Vos positions", no_holdings: "Aucune position enregistrée.",
      contribution_title: "Objectif mensuel d'investissement (15% du salaire)", log_contribution: "Enregistrer une contribution",
      contribution_amount: "Montant contribué", contribution_history: "Historique des contributions",
      adherence: "d'adhésion ce mois-ci", stale_note: "Valeurs telles que saisies — connectez un flux de prix en direct plus tard."
    },
    sim: {
      title: "Simulation de croissance", disclaimer: "Ceci est une projection basée sur vos hypothèses — pas une garantie de résultats futurs.",
      current_capital: "Capital actuel (USD)", monthly_contribution: "Contribution mensuelle (USD)",
      years: "Durée de projection (années)", rate_preset: "Rendement annuel supposé",
      conservative: "Prudent (4%)", moderate: "Modéré (7%)", aggressive: "Agressif (10%)", custom: "Personnalisé",
      custom_rate: "Taux annuel personnalisé (%)", run: "Lancer la simulation",
      projected_value: "Valeur projetée après {years} ans", total_contributed: "Total que vous aurez contribué",
      growth_from_returns: "Croissance liée aux rendements"
    },
    profile: {
      title: "Profil d'investissement", intro: "Quelques questions pour adapter les suggestions à votre situation. Aucun ordre n'est jamais passé — uniquement des catégories à explorer.",
      risk_q: "Comment décaractionneriez-vous votre tolérance au risque ?", risk_conservative: "Prudent — protéger ce que j'ai",
      risk_moderate: "Modéré — croissance équilibrée", risk_aggressive: "Agressif — maximiser la croissance à long terme",
      goal_q: "Quel est votre objectif principal ?", goal_retirement: "Retraite", goal_house: "Achat d'une maison",
      goal_wealth: "Croissance générale du patrimoine", goal_education: "Éducation",
      horizon_q: "Horizon de temps", horizon_short: "Moins de 3 ans", horizon_mid: "3à 7 ans", horizon_long: "7 ans ou plus",
      submit: "Obtenir des suggestions", result_title: "Catégories d'allocation suggérées",
      not_advice: "À titre informatif uniquement — pas un ordre de bourse ni un conseil financier personnalisé. Consultez un conseiller agréé pour vos décisions importantes.",
      retake: "Refaire le questionnaire"
    },
    sentiment: {
      title: "Sentiment du marché", demo_note: "Données de démonstration pour vos types d'actifs. Connectez un fournisseur de données de marché en direct pour les remplacer.",
      no_holdings: "Ajoutez une position d'investissement pour voir le sentiment de vos types d'actifs.",
      bullish: "Haussier", neutral: "Neutre", bearish: "Baissier"
    },
    alerts: {
      title: "Alertes", filter_all: "Toutes", filter_unread: "Non lues", mark_read: "Marquer comme lue", dismiss: "Ignorer",
      no_alerts: "Rien ici pour l'instant.", why: "Pourquoi c'est important", suggestion: "Action suggérée",
      types: { budget: "Budget", ef: "Fonds d'urgence", invest: "Contribution d'investissement", sim: "Simulation" },
      budget_title: "{bucket} : {pct}% dépensé", budget_why: "{spent}$ sur {allowance}$ de l'objectif {bucket} dépensés — {days} jour(s) restant(s) ce mois-ci.",
      budget_suggestion_needs: "Revoyez vos factures fixes à venir pour voir ce qui peut être reporté, et évitez tout nouvel engagement dans cette catégorie jusqu'au mois prochain.",
      budget_suggestion_wants: "Suspendez les nouveaux achats en {bucket} pour le reste du mois afin de rester sur la bonne voie.",
      budget_suggestion_savings: "Vous êtes en avance sur l'épargne/dette ce mois-ci — aucune action requise, c'est une tendance positive.",
      ef_title: "Fonds d'urgence en dessous de l'objectif",
      ef_why: "Votre fonds d'urgence est {gap}$ en dessous de son objectif de 6 mois de {target}$, et aucune contribution n'a été enregistrée ce mois-ci.",
      ef_suggestion: "Enregistrez une contribution à votre fonds d'urgence avant la fin du mois, même petite, pour continuer à progresser vers l'objectif.",
      invest_title: "Contribution d'investissement risquant d'être manquée",
      invest_why: "Vous avez contribué {contributed}$ sur votre objectif de {target}$ (15% du salaire) ce mois-ci, avec {days} jour(s) restant(s).",
      invest_suggestion: "Enregistrez {remaining}$ avant la fin du mois pour respecter votre taux d'investissement de 15%."
    },
    settings: {
      title: "Paramètres", language: "Langue", currency: "Devise", currency_note: "Fixée à USD pour l'instant.",
      notif_prefs: "Préférences de notification", channel_inapp: "Dans l'application", channel_email: "E-mail", channel_push: "Push",
      channel_note: "E-mail et push nécessitent un service de notification connecté et ne sont pas encore livrés hors de l'application.",
      account: "Compte", email_label: "E-mail", export_data: "Exporter mes données (JSON)", delete_account: "Supprimer le compte",
      delete_confirm: "Ceci supprime définitivement toutes vos données Titbits de ce navigateur. Continuer ?"
    },
    bank: {
      title: "Connecter des comptes", body: "L'importation automatique depuis une carte bancaire ou MonCash est prévue pour une phase future et nécessite un fournisseur de connexion agréé non encore mis en place.",
      manual_note: "La saisie manuelle reste entièrement disponible et n'est jamais supprimée — rien ne change ici pour votre suivi actuel.",
      cta: "Me prévenir quand c'est prêt", notified: "Nous vous préviendrons.",
      connect_bank: "Connecter une banque / carte", connect_moncash: "Connecter MonCash"
    },
    topbar: {
      greeting: "Bonjour {name}", change_photo: "Changer la photo", upload_photo: "Ajouter une photo"
    },
    transactions: {
      title: "Transactions", subtitle: "Tous vos revenus et dépenses, comme un relevé bancaire.",
      filter_month: "Mois", all_types: "Tous", income_only: "Revenus", expense_only: "Dépenses",
      total_income: "Total des revenus", total_expenses: "Total des dépenses", net: "Net",
      download_csv: "Télécharger en CSV", print_report: "Imprimer le rapport mensuel",
      no_transactions: "Aucune transaction ce mois-ci.", date: "Date", description: "Description", category: "Catégorie", type: "Type", amount: "Montant",
      view_link: "Voir les transactions et le rapport"
    },
    common: {
      save: "Enregistrer", cancel: "Annuler", edit: "Modifier", close: "Fermer", loading: "Chargement…",
      required: "Requis", usd: "USD", back_to_dashboard: "Retour au tableau de bord"
    }
  },

  es: {
    app_name: "Titbits",
    tagline: "Véalo todo. Cree el hábito. Alcance su libertad.",
    nav: { dashboard: "Panel", add_entry: "Añadir", transactions: "Transacciones", budget: "Presupuesto", emergency_fund: "Fondo de emergencia", investments: "Inversiones",
      simulation: "Simulación", profile_tool: "Perfil de inversión", sentiment: "Sentimiento del mercado", alerts: "Alertas",
      settings: "Ajustes", bank_connect: "Conectar cuentas", logout: "Cerrar sesión", login: "Iniciar sesión", signup: "Registrarse" },
    landing: {
      hero_title: "Disciplina financiera, por fin visible.",
      hero_sub: "Titbits registra cada gasto, vigila cada inversión y le dice exactamente qué hacer después — antes de que los problemas se agraven.",
      cta_start: "Empezar gratis", cta_login: "Ya tengo una cuenta",
      f1_title: "Registre en menos de 15 segundos", f1_body: "Entrada rápida de ingresos y gastos, con categorías predeterminadas inteligentes.",
      f2_title: "50/30/20, de un vistazo", f2_body: "Vea Necesidades, Deseos y Ahorros frente a su objetivo — sin cálculos.",
      f3_title: "Alertas antes de fallar", f3_body: "Avisos antes de perder una aportación de inversión o que baje su fondo de emergencia.",
      f4_title: "Simule su futuro", f4_body: "Proyecte el crecimiento de su capital, con los supuestos siempre visibles.",
      privacy_note: "Sus datos permanecen en su navegador. Nada se comparte sin su consentimiento explícito."
    },
    auth: {
      login_title: "Bienvenido de nuevo", signup_title: "Cree su cuenta",
      email: "Correo electrónico", password: "Contraseña", confirm_password: "Confirmar contraseña",
      login_button: "Iniciar sesión", signup_button: "Crear cuenta",
      no_account: "¿Nuevo en Titbits?", have_account: "¿Ya tiene una cuenta?",
      create_one: "Crear una cuenta", log_in_link: "Iniciar sesión",
      error_mismatch: "Las contraseñas no coinciden.", error_exists: "Ya existe una cuenta con ese correo.",
      error_invalid: "Correo o contraseña incorrectos.", error_weak: "Use al menos 6 caracteres.",
      demo_note: "Esto funciona totalmente en su navegador — no reutilice una contraseña real.",
      first_name: "Nombre", last_name: "Apellido", date_of_birth: "Fecha de nacimiento", country: "País",
      select_country: "Seleccione su país",
      verify_title: "Verifique su correo", verify_body: "Esta demo no tiene un servidor de correo real, así que no podemos enviarle un correo de verdad. Aquí está el código que se habría enviado a {email}:",
      verify_code_label: "Ingrese el código de 6 dígitos", verify_button: "Verificar correo", skip_verification: "Omitir por ahora",
      resend_code: "Reenviar código", code_resent: "Nuevo código generado abajo.",
      error_code_invalid: "Ese código no coincide. Inténtelo de nuevo.", verified_success: "¡Correo verificado!"
    },
    onboarding: {
      title: "Configuremos su situación", step: "Paso",
      salary_label: "Salario mensual (USD)", salary_help: "Su ingreso neto fijo mensual. Puede cambiarlo cuando quiera.",
      pay_frequency_label: "Frecuencia de pago",
      freq_monthly: "Mensual", freq_biweekly: "Quincenal", freq_weekly: "Semanal",
      ef_label: "Saldo actual del fondo de emergencia (USD)", ef_help: "Empiece en 0 si está comenzando — es normal.",
      avg_expense_label: "Gastos mensuales promedio estimados (USD)", avg_expense_help: "Se usa para calcular su objetivo de fondo de emergencia de 6 meses. Puede ajustarlo después.",
      holdings_title: "¿Inversiones existentes? (opcional)", holdings_skip: "Omitir por ahora, las añadiré después",
      notif_title: "¿Cómo debemos contactarle?", notif_help: "Las alertas en la app siempre funcionan. Correo y push requieren un servicio conectado — actvábelos después en Ajustes.",
      finish: "Ir a mi panel", back: "Atrás", next: "Continuar"
    },
    dashboard: {
      title: "Panel", welcome: "Bienvenido de nuevo",
      budget_title: "50/30/20 de este mes", ef_title: "Fondo de emergencia", invest_title: "Aportación de inversión",
      recent_alerts: "Alertas recientes", no_alerts: "No hay alertas por ahora — va por buen camino.",
      needs: "Necesidades", wants: "Deseos", savings: "Ahorros",
      target: "objetivo", spent: "gastado", of: "de",
      ef_progress: "del objetivo de 6 meses", invest_progress: "del objetivo mensual del 15%",
      quick_add: "Añadir gasto", quick_add_income: "Añadir ingreso",
      empty_title: "Aún no hay datos", empty_body: "Registre su primer ingreso o gasto para ver su panorama tomar forma.",
      view_all_alerts: "Ver todas las alertas",
      add_extra_income: "Añadir ingreso extra", extra_income_modal_title: "Añadir ingreso extra",
      choose_bucket: "¿A dónde debe ir este dinero? Repártalo como quiera.",
      alloc_needs: "Necesidades", alloc_wants: "Deseos", alloc_savings: "Ahorros", alloc_investment: "Inversión",
      total_must_equal_100: "Los porcentajes deben sumar 100%.", save_allocation: "Añadir ingreso",
      cycle_label: "Ciclo de reinicio", cycle_help: "Necesidades/Deseos/Ahorros y su seguimiento de inversión se reinician automáticamente al inicio de cada nuevo ciclo.",
      cycle_option: "Cada {days} días"
    },
    budget: {
      title: "Planificador de presupuesto", subtitle: "Cree un presupuesto línea por línea, luego compárelo con la realidad.",
      group_needs: "Necesidades", group_wants: "Deseos", group_savings: "Ahorros", group_investments: "Inversiones", group_debts: "Deudas",
      planned: "Planeado", actual: "Real", difference: "Diferencia", total: "Total",
      add_custom: "+ Añadir línea", custom_line_prompt: "Nombre esta línea de presupuesto", remove: "Eliminar",
      save: "Guardar presupuesto", saved: "Presupuesto guardado.",
      vs_reality_title: "Presupuesto vs. realidad (este ciclo)", no_lines: "Aún no hay líneas en esta sección.",
      advice_title: "Consejo financiero", advice_group_over: "Está al {pct}% de su presupuesto de {group} para este ciclo — vale la pena revisarlo.",
      advice_line_over: "{label} excede el presupuesto en ${over} este ciclo.", advice_line_under: "{label} está ${under} por debajo del presupuesto — bien controlado.",
      advice_no_investment: "Planeó un presupuesto de inversión pero aún no ha registrado ninguna aportación este ciclo.",
      advice_high_debt: "Los pagos de deuda representan una gran parte de su gasto este ciclo — considere priorizar pagos adicionales hacia su deuda de mayor interés.",
      advice_on_track: "En general, está en o por debajo de su presupuesto total planeado para este ciclo — siga así.",
      advice_none: "Defina montos planeados en algunas líneas para empezar a recibir consejos personalizados."
    },
    entry: {
      title: "Añadir entrada", type: "Tipo", income: "Ingreso", expense: "Gasto",
      amount: "Monto (USD)", date: "Fecha", category: "Categoría", source: "Origen",
      note: "Nota (opcional)", recurring: "Se repite cada mes", one_off: "Puntual / planificado (no activa alertas)",
      save: "Guardar entrada", saved: "¡Guardado!", pick_category: "Elegir una categoría",
      cat_needs: "Necesidades", cat_wants: "Deseos", cat_savings: "Ahorros / Deuda",
      categories: {
        rent: "Alquiler / Hipoteca", utilities: "Servicios", groceries: "Comida / Comestibles", transportation: "Transporte",
        insurance: "Seguro", debt: "Pagos de deuda", healthcare: "Salud", other_needs: "Otras necesidades",
        electricity: "Electricidad", water: "Agua", school_fees: "Cuotas escolares", phone_internet: "Teléfono / Internet",
        dining: "Restaurantes", entertainment: "Entretenimiento", shopping: "Compras", travel: "Viajes",
        subscriptions: "Suscripciones", hobbies: "Pasatiempos", other_wants: "Otros deseos",
        emergency_fund: "Fondo de emergencia", investment: "Inversión", extra_debt: "Pago extra de deuda", other_savings: "Otro ahorro",
        general_savings: "Ahorro general",
        investment_contributions: "Aportaciones de inversión", retirement: "Jubilación", real_estate: "Bienes raíces", stocks_etfs: "Acciones / ETF",
        credit_card: "Tarjeta de crédito", student_loan: "Préstamo estudiantil", car_loan: "Préstamo de auto", personal_loan: "Préstamo personal"
      },
      income_sources: { salary: "Salario", freelance: "Freelance", bonus: "Bono", gift: "Regalo", other_income: "Otro" },
      recent_entries: "Entradas recientes", no_entries: "Aún no hay entradas.", delete: "Eliminar"
    },
    ef: {
      title: "Fondo de emergencia", current_balance: "Saldo actual", target: "Objetivo (6 meses de gastos)",
      monthly_expense_figure: "Gasto mensual usado", edit_target: "Editar objetivo",
      log_transaction: "Registrar transacción", contribution: "Aportación", withdrawal: "Retiro",
      history: "Historial de transacciones", no_history: "Aún no hay transacciones.",
      auto_suggest: "Sugerir según mis gastos", months_covered: "meses de gastos cubiertos"
    },
    inv: {
      title: "Inversiones", total_value: "Valor total del portafolio", total_contributed: "Total aportado",
      gain_loss: "Ganancia / Pérdida", allocation: "Asignación por tipo",
      add_holding: "Añadir posición", holding_type: "Tipo", stock: "Acción", etf: "ETF", bond: "Bono", other: "Otro",
      name_ticker: "Nombre / Símbolo", quantity: "Cantidad", cost_basis: "Costo base (total, USD)",
      current_value: "Valor actual (total, USD)", date_acquired: "Fecha de adquisición",
      holdings_list: "Sus posiciones", no_holdings: "Aún no hay posiciones.",
      contribution_title: "Objetivo mensual de inversión (15% del salario)", log_contribution: "Registrar aportación",
      contribution_amount: "Monto aportado", contribution_history: "Historial de aportaciones",
      adherence: "de cumplimiento este mes", stale_note: "Valores tal como se ingresaron — conecte un feed de precios en vivo más adelante."
    },
    sim: {
      title: "Simulación de crecimiento", disclaimer: "Esto es una proyección basada en sus supuestos — no una garantía de resultados futuros.",
      current_capital: "Capital actual (USD)", monthly_contribution: "Aportación mensual (USD)",
      years: "Duración de la proyección (años)", rate_preset: "Rendimiento anual supuesto",
      conservative: "Conservador (4%)", moderate: "Moderado (7%)", aggressive: "Agresivo (10%)", custom: "Personalizado",
      custom_rate: "Tasa anual personalizada (%)", run: "Ejecutar simulación",
      projected_value: "Valor proyectado tras {years} años", total_contributed: "Total que habrá aportado",
      growth_from_returns: "Crecimiento por rendimientos"
    },
    profile: {
      title: "Perfil de inversión", intro: "Algunas preguntas para ajustar las sugerencias a su situación. Nunca se ejecuta una orden — solo se sugieren categorías a investigar.",
      risk_q: "¿Cómo describiría su tolerancia al riesgo?", risk_conservative: "Conservador — proteger lo que tengo",
      risk_moderate: "Moderado — crecimiento equilibrado", risk_aggressive: "Agresivo — maximizar el crecimiento a largo plazo",
      goal_q: "¿Cuál es su objetivo principal?", goal_retirement: "Jubilación", goal_house: "Comprar una casa",
      goal_wealth: "Crecimiento general del patrimonio", goal_education: "Educación",
      horizon_q: "Horizonte de tiempo", horizon_short: "Menos de 3 años", horizon_mid: "3 a 7 años", horizon_long: "7+ años",
      submit: "Obtener sugerencias", result_title: "Categorías de asignación sugeridas",
      not_advice: "Solo informativo — no es una orden de bolsa ni asesoría financiera personalizada. Considere hablar con un asesor licenciado para decisiones importantes.",
      retake: "Repetir el cuestionario"
    },
    sentiment: {
      title: "Sentimiento del mercado", demo_note: "Datos de demostración para sus tipos de activos. Conecte un proveedor de datos de mercado en vivo para reemplazarlos.",
      no_holdings: "Añada una posición de inversión para ver el sentimiento de sus tipos de activos.",
      bullish: "Alcista", neutral: "Neutral", bearish: "Bajista"
    },
    alerts: {
      title: "Alertas", filter_all: "Todas", filter_unread: "No leídas", mark_read: "Marcar como leída", dismiss: "Descartar",
      no_alerts: "Aún no hay nada aquí.", why: "Por qué importa", suggestion: "Acción sugerida",
      types: { budget: "Presupuesto", ef: "Fondo de emergencia", invest: "Aportación de inversión", sim: "Simulación" },
      budget_title: "{bucket}: {pct}% gastado", budget_why: "${spent} de ${allowance} del objetivo de {bucket} gastados — quedan {days} día(s) este mes.",
      budget_suggestion_needs: "Revise las próximas facturas fijas para ver qué se puede posponer, y evite nuevos compromisos en esta categoría hasta el próximo mes.",
      budget_suggestion_wants: "Pause las nuevas compras en {bucket} por el resto del mes para mantenerse en el camino.",
      budget_suggestion_savings: "Va adelantado en ahorro/deuda este mes — no se necesita ninguna acción, es una tendencia positiva.",
      ef_title: "Fondo de emergencia por debajo del objetivo",
      ef_why: "Su fondo de emergencia está ${gap} por debajo de su objetivo de 6 meses de ${target}, y no se ha registrado ninguna aportación este mes.",
      ef_suggestion: "Registre una aportación a su fondo de emergencia antes de fin de mes, aunque sea pequeña, para seguir avanzando hacia el objetivo.",
      invest_title: "Aportación de inversión en riesgo de no cumplirse",
      invest_why: "Ha aportado ${contributed} de su objetivo de ${target} (15% del salario) este mes, con {days} día(s) restante(s).",
      invest_suggestion: "Registre ${remaining} antes de fin de mes para mantener su tasa de inversión del 15%."
    },
    settings: {
      title: "Ajustes", language: "Idioma", currency: "Moneda", currency_note: "Fijada en USD por ahora.",
      notif_prefs: "Preferencias de notificación", channel_inapp: "En la app", channel_email: "Correo", channel_push: "Push",
      channel_note: "Correo y push requieren un servicio de notificación conectado y aún no se entregan fuera de la app.",
      account: "Cuenta", email_label: "Correo electrónico", export_data: "Exportar mis datos (JSON)", delete_account: "Eliminar cuenta",
      delete_confirm: "Esto elimina permanentemente todos sus datos de Titbits de este navegador. ¿Continuar?"
    },
    bank: {
      title: "Conectar cuentas", body: "La importación automática desde una tarjeta bancaria o MonCash está planificada para una fase futura y requiere un proveedor de conexión con licencia aún no configurado.",
      manual_note: "La entrada manual sigue totalmente disponible y nunca se elimina — nada cambia aquí en su seguimiento actual.",
      cta: "Notificarme cuando esté listo", notified: "Le avisaremos.",
      connect_bank: "Conectar banco / tarjeta", connect_moncash: "Conectar MonCash"
    },
    topbar: {
      greeting: "Hola {name}", change_photo: "Cambiar foto", upload_photo: "Añadir foto"
    },
    transactions: {
      title: "Transacciones", subtitle: "Todos sus ingresos y gastos, como un estado de cuenta bancario.",
      filter_month: "Mes", all_types: "Todos", income_only: "Ingresos", expense_only: "Gastos",
      total_income: "Total de ingresos", total_expenses: "Total de gastos", net: "Neto",
      download_csv: "Descargar CSV", print_report: "Imprimir informe mensual",
      no_transactions: "No hay transacciones este mes.", date: "Fecha", description: "Descripción", category: "Categoría", type: "Tipo", amount: "Monto",
      view_link: "Ver transacciones e informe"
    },
    common: {
      save: "Guardar", cancel: "Cancelar", edit: "Editar", close: "Cerrar", loading: "Cargando…",
      required: "Obligatorio", usd: "USD", back_to_dashboard: "Volver al panel"
    }
  }
};

const LANG_KEY = "titbits:lang";
let currentLang = localStorage.getItem(LANG_KEY) || "en";

export function getLang() { return currentLang; }

export function setLang(lang) {
  if (!STRINGS[lang]) return;
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
}

export function t(key, vars) {
  const parts = key.split(".");
  let node = STRINGS[currentLang];
  for (const p of parts) node = node && node[p];
  if (node === undefined) {
    let fallback = STRINGS.en;
    for (const p of parts) fallback = fallback && fallback[p];
    node = fallback;
  }
  if (typeof node === "string" && vars) {
    return node.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : `{${k}}`));
  }
  return node !== undefined ? node : key;
}

export const availableLangs = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" }
];
