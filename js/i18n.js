const STRINGS = {
  en: {
    app_name: "Titbits",
    tagline: "See it all. Build the habit. Reach your freedom.",
    nav: { dashboard: "Dashboard", add_entry: "Add Entry", emergency_fund: "Emergency Fund", investments: "Investments",
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
      demo_note: "This runs entirely in your browser — please don't reuse a real password you use elsewhere."
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
      view_all_alerts: "View all alerts"
    },
    entry: {
      title: "Add Entry", type: "Type", income: "Income", expense: "Expense",
      amount: "Amount (USD)", date: "Date", category: "Category", source: "Source",
      note: "Note (optional)", recurring: "This repeats every month", one_off: "One-off / planned (won't trigger overspend alerts)",
      save: "Save entry", saved: "Saved!", pick_category: "Choose a category",
      cat_needs: "Needs", cat_wants: "Wants", cat_savings: "Savings / Debt",
      categories: {
        rent: "Rent / Mortgage", utilities: "Utilities", groceries: "Groceries", transportation: "Transportation",
        insurance: "Insurance", debt: "Debt Payments", healthcare: "Healthcare", other_needs: "Other Needs",
        dining: "Dining Out", entertainment: "Entertainment", shopping: "Shopping", travel: "Travel",
        subscriptions: "Subscriptions", hobbies: "Hobbies", other_wants: "Other Wants",
        emergency_fund: "Emergency Fund", investment: "Investment", extra_debt: "Extra Debt Payment", other_savings: "Other Savings"
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
    common: {
      save: "Save", cancel: "Cancel", edit: "Edit", close: "Close", loading: "Loading…",
      required: "Required", usd: "USD", back_to_dashboard: "Back to dashboard"
    }
  },

  fr: {
    app_name: "Titbits",
    tagline: "Tout voir. Construire l'habitude. Atteindre votre liberté.",
    nav: { dashboard: "Tableau de bord", add_entry: "Ajouter", emergency_fund: "Fonds d'urgence", investments: "Investissements",
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
      demo_note: "Ceci fonctionne entièrement dans votre navigateur — merci de ne pas réutiliser un mot de passe réel."
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
      view_all_alerts: "Voir toutes les alertes"
    },
    entry: {
      title: "Ajouter une entrée", type: "Type", income: "Revenu", expense: "Dépense",
      amount: "Montant (USD)", date: "Date", category: "Catégorie", source: "Source",
      note: "Note (optionnel)", recurring: "Se répète chaque mois", one_off: "Ponctuel / prévu (n'alertera pas)",
      save: "Enregistrer", saved: "Enregistré !", pick_category: "Choisir une catégorie",
      cat_needs: "Besoins", cat_wants: "Envies", cat_savings: "Épargne / Dette",
      categories: {
        rent: "Loyer / Hypothèque", utilities: "Services publics", groceries: "Épicerie", transportation: "Transport",
        insurance: "Assurance", debt: "Paiements de dette", healthcare: "Santé", other_needs: "Autres besoins",
        dining: "Restaurants", entertainment: "Divertissement", shopping: "Achats", travel: "Voyage",
        subscriptions: "Abonnements", hobbies: "Loisirs", other_wants: "Autres envies",
        emergency_fund: "Fonds d'urgence", investment: "Investissement", extra_debt: "Dette supplémentaire", other_savings: "Autre épargne"
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
    common: {
      save: "Enregistrer", cancel: "Annuler", edit: "Modifier", close: "Fermer", loading: "Chargement…",
      required: "Requis", usd: "USD", back_to_dashboard: "Retour au tableau de bord"
    }
  },

  es: {
    app_name: "Titbits",
    tagline: "Véalo todo. Cree el hábito. Alcance su libertad.",
    nav: { dashboard: "Panel", add_entry: "Añadir", emergency_fund: "Fondo de emergencia", investments: "Inversiones",
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
      demo_note: "Esto funciona totalmente en su navegador — no reutilice una contraseña real."
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
      view_all_alerts: "Ver todas las alertas"
    },
    entry: {
      title: "Añadir entrada", type: "Tipo", income: "Ingreso", expense: "Gasto",
      amount: "Monto (USD)", date: "Fecha", category: "Categoría", source: "Origen",
      note: "Nota (opcional)", recurring: "Se repite cada mes", one_off: "Puntual / planificado (no activa alertas)",
      save: "Guardar entrada", saved: "¡Guardado!", pick_category: "Elegir una categoría",
      cat_needs: "Necesidades", cat_wants: "Deseos", cat_savings: "Ahorros / Deuda",
      categories: {
        rent: "Alquiler / Hipoteca", utilities: "Servicios", groceries: "Comestibles", transportation: "Transporte",
        insurance: "Seguro", debt: "Pagos de deuda", healthcare: "Salud", other_needs: "Otras necesidades",
        dining: "Restaurantes", entertainment: "Entretenimiento", shopping: "Compras", travel: "Viajes",
        subscriptions: "Suscripciones", hobbies: "Pasatiempos", other_wants: "Otros deseos",
        emergency_fund: "Fondo de emergencia", investment: "Inversión", extra_debt: "Pago extra de deuda", other_savings: "Otro ahorro"
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
