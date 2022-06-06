Public Class NCCuentaBancaria

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarCuentasBancarias(ByVal p_CTLG_CODE As String, ByVal p_CODE As String, Optional ByVal p_ESTADO As String = "", Optional ByVal p_MONE_CODE As String = "", Optional ByVal p_BANC_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_CUENTAS_BANCARIAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", "", ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_BANC_CODE", p_BANC_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarAutorizadosMixtos(ByVal p_CUEN_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_ITEM As String, ByVal p_MONTO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_AUTORIZADOS_MIXTOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CUEN_CODE", p_CUEN_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarCuentaBancaria(ByVal P_CTLG_CODE As String, ByVal P_CUEN_CODE As String, ByVal P_NRO_CUENTA As String,
                                             ByVal P_PIDM_SECTORISTA As String, ByVal P_FECHA_CIERRE As String, ByVal P_CTAS_CODE As String,
                                             ByVal P_PAGO_CHEQUERA As String, ByVal P_PAGO_TAR_TRABAJO As String, ByVal P_BILLETERA_DIG As String, ByVal P_CUENTA_COBRANZA As String,
                                             ByVal P_PIDM_AUT1 As String, ByVal P_ESTADO_IND As String, ByVal P_USUA_ID As String, ByVal P_FIRMA As String,
                                             ByVal P_MONEDA As String, ByVal P_CTA_INTER As String, ByVal p_RESPONSABLES As String) As String
        Try
            Dim msg As String = "ERROR"

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_CUENTA_BANCARIA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CUEN_CODE", P_CUEN_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_NRO_CUENTA", P_NRO_CUENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_SECTORISTA", P_PIDM_SECTORISTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA_CIERRE", P_FECHA_CIERRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTAS_CODE", P_CTAS_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PAGO_CHEQUERA", P_PAGO_CHEQUERA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PAGO_TAR_TRABAJO", P_PAGO_TAR_TRABAJO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_BILLETERA_DIG", P_BILLETERA_DIG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CUENTA_COBRANZA", P_CUENTA_COBRANZA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_AUT1", P_PIDM_AUT1, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FIRMA", P_FIRMA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONEDA", P_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTA_INTER", P_CTA_INTER, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPONSABLES", p_RESPONSABLES, ParameterDirection.Input, 253))
            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try

    End Function

    Public Function CrearCuentaBancaria(ByVal P_CTLG_CODE As String, ByVal P_NRO_CUENTA As String, ByVal P_BANC_CODE As String,
                                                ByVal P_TIPO_CUENTA As String, ByVal P_MONEDA As String, ByVal P_CTA_INTER As String,
                                                ByVal P_PIDM_SECTORISTA As String, ByVal P_FECHA_APERTURA As String, ByVal P_FECHA_CIERRE As String,
                                                ByVal P_CTAS_CODE As String, ByVal P_PAGO_CHEQUERA As String, ByVal P_PAGO_TAR_TRABAJO As String, ByVal P_BILLETERA_DIG As String,
                                                ByVal P_CUENTA_COBRANZA As String, ByVal P_PIDM_AUT1 As String, ByVal P_ESTADO_IND As String, ByVal P_USUA_ID As String,
                                                ByVal P_FIRMA As String, ByVal p_RESPONSABLES As String) As String
        Try
            Dim estado As String = "000000"
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFG_CREAR_CUENTA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_NRO_CUENTA", P_NRO_CUENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_BANC_CODE", P_BANC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_CUENTA", P_TIPO_CUENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_MONEDA", P_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTA_INTER", P_CTA_INTER, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_SECTORISTA", P_PIDM_SECTORISTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA_APERTURA", P_FECHA_APERTURA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA_CIERRE", P_FECHA_CIERRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTAS_CODE", P_CTAS_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PAGO_CHEQUERA", P_PAGO_CHEQUERA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PAGO_TAR_TRABAJO", P_PAGO_TAR_TRABAJO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_BILLETERA_DIG", P_BILLETERA_DIG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CUENTA_COBRANZA", P_CUENTA_COBRANZA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_AUT1", P_PIDM_AUT1, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FIRMA", P_FIRMA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPONSABLES", p_RESPONSABLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CUEN_CODE", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            estado = cmd1.Parameters("@P_CUEN_CODE").Value

            Return estado

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstadoCuentaBancaria(ByVal p_CTLG_CODE As String, ByVal p_CODE As String) As String
        Try
            Dim estado As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CAMBIAR_ESTADO_CUENTA_BANCARIA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            estado = cmd1.Parameters("@P_ESTADO").Value

            Return estado

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class
