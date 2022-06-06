Public Class NCTipoDCEmpresa

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function ListarTipoDCEspecifico(ByVal P_TIPO_DCTO As String, ByVal P_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFT_LISTAR_TIPO_DOC_ESPECIFICOS_CTLG", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_DCTO", P_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
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

    Public Function VerificarFormatoTicket(ByVal P_DOC_CODE As String, ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFT_VERIFICAR_FORMATO_TICKET", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_DOC_CODE", P_DOC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
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

    Public Function ListarTipoDCEmpresa(ByVal P_CODE As String, ByVal P_CTLG_CODE As String, ByVal P_DCTO_CODE As String, ByVal P_ESTADO_IND As String,
                                        Optional P_GASTOS_IND As String = "", Optional P_ALMACEN_IND As String = "", Optional P_COMPRA_VENTA_IND As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_TIPO_DC_CTLG", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DCTO_CODE", P_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_GASTOS", P_GASTOS_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ALMACEN", P_ALMACEN_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COMPRA_VENTA", P_COMPRA_VENTA_IND, ParameterDirection.Input, 253))
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

    Public Function ListarTipoDCEmpresaElectronica(ByVal P_CTLG_CODE As String, ByVal P_ESTADO_IND As String, ByVal P_SCSL_CODE As String, ByVal P_FORMATO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_DOC_ELECTRONICO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", P_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FORMATO", P_FORMATO, ParameterDirection.Input, 253))
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


    Public Function CrearTipoDCEmpresa(ByVal P_CTLG_CODE As String, ByVal P_DCTO_CODE As String,
                                       ByVal P_GASTOS As String, ByVal P_ALMACEN As String,
                                       ByVal P_COMPRA_VENTA As String, ByVal P_CASOS_ESP_IND As String,
                                       ByVal P_USUA_ID As String, ByVal P_FECHA_ELEC As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_TIPO_DC_CTLG", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DCTO_CODE", P_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_GASTOS", IIf(P_GASTOS = "", DBNull.Value, P_GASTOS), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ALMACEN", IIf(P_ALMACEN = "", DBNull.Value, P_ALMACEN), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COMPRA_VENTA", IIf(P_COMPRA_VENTA = "", DBNull.Value, P_COMPRA_VENTA), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA_ELEC", IIf(P_FECHA_ELEC Is Nothing, DBNull.Value, P_FECHA_ELEC), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CASOS_ESP_IND", IIf(P_CASOS_ESP_IND = "", DBNull.Value, P_CASOS_ESP_IND), ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd.Parameters("@P_CODE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarTipoDCEmpresa(ByVal P_CODE As String,
                                       ByVal P_GASTOS As String, ByVal P_ALMACEN As String,
                                       ByVal P_COMPRA_VENTA As String, ByVal P_CASOS_ESP_IND As String,
                                       ByVal P_USUA_ID As String, ByVal P_FECHA_ELEC As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_TIPO_DC_CTLG", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_GASTOS", IIf(P_GASTOS = "", DBNull.Value, P_GASTOS), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ALMACEN", IIf(P_ALMACEN = "", DBNull.Value, P_ALMACEN), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COMPRA_VENTA", IIf(P_COMPRA_VENTA = "", DBNull.Value, P_COMPRA_VENTA), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CASOS_ESP_IND", IIf(P_CASOS_ESP_IND = "", DBNull.Value, P_CASOS_ESP_IND), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA_ELEC", P_FECHA_ELEC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstadoTipoDCEmpresa(ByVal P_CODE As String, ByVal P_USUA_ID As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CAMBIAR_ESTADO_TIPO_DC_CTLG", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@P_ESTADO").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Listar_Tipo_dcto_emite(ByVal P_CODE As String, ByVal P_CTLG_CODE As String, ByVal P_DCTO_CODE As String, ByVal P_ESTADO_IND As String, P_TIPO As String,
                                    Optional P_GASTOS_IND As String = "", Optional P_ALMACEN_IND As String = "", Optional P_COMPRA_VENTA_IND As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_TIPO_DOCUMENTO_EMITE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DCTO_CODE", P_DCTO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_GASTOS", P_GASTOS_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ALMACEN", P_ALMACEN_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COMPRA_VENTA", P_COMPRA_VENTA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO", P_TIPO, ParameterDirection.Input, 253))
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

End Class

