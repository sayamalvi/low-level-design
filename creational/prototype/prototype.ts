// Prototype interface
// Declares clone() and common operations used by clients.
interface EmailTemplate {
  clone(): EmailTemplate;
  setContent(content: string): void;
  send(to: string): void;
}

// Concrete Prototype
// Holds the actual state and defines how cloning happens.
class WelcomeEmail implements EmailTemplate {
  private subject: string;
  private content: string;
  private metadata: { category: string; tags: string[] };

  constructor(
    subject = "Welcome to TUF+",
    content = "Hi there! Thanks for joining us.",
    metadata: { category: string; tags: string[] } = {
      category: "welcome",
      tags: ["onboarding"],
    }
  ) {
    this.subject = subject;
    this.content = content;
    this.metadata = metadata;
  }

  // Core Prototype step:
  // create a new object by copying current state instead of rebuilding manually.
  clone(): EmailTemplate {
    // Deep clone nested metadata so original and clone remain independent.
    const metadataCopy = {
      category: this.metadata.category,
      tags: [...this.metadata.tags],
    };

    return new WelcomeEmail(
      this.subject,
      this.content,
      metadataCopy
    );
  }

  setContent(content: string): void {
    this.content = content;
  }

  send(to: string): void {
    console.log(`Sending to ${to}: [${this.subject}] ${this.content}`);
  }
}

// Prototype Registry
// Stores pre-configured prototype instances and returns clones on demand.
// For every key store an EmailTemplate
class EmailTemplateRegistry {
  private static readonly templates = new Map<string, EmailTemplate>([
    ["welcome", new WelcomeEmail()],
  ]);

  // Never return the original prototype; always return a clone.
  static getTemplate(type: string): EmailTemplate {
    const template = this.templates.get(type);
    if (!template) {
      throw new Error(`No template registered for type: ${type}`);
    }
    return template.clone();
  }
}

// Client code:
// Requests clones from registry, customizes clone-specific fields, and uses them.
const welcomeEmail1 = EmailTemplateRegistry.getTemplate("welcome");
welcomeEmail1.setContent("Hi Alice, welcome to TUF Premium!");
welcomeEmail1.send("alice@example.com");

const welcomeEmail2 = EmailTemplateRegistry.getTemplate("welcome");
welcomeEmail2.setContent("Hi Bob, thanks for joining!");
welcomeEmail2.send("bob@example.com");
