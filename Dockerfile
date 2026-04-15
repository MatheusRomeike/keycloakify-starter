FROM quay.io/keycloak/keycloak:latest

ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

COPY ./dist_keycloak/keycloak-theme-for-kc-22-to-25.jar /opt/keycloak/providers/keycloak-theme.jar

RUN /opt/keycloak/bin/kc.sh build

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]